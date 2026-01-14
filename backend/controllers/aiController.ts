import { callGemini } from "../aiApi/callGemini.js";
import { Request, Response } from "express";
import Invoice from "../models/Invoice.js";

export const parseInvoiceFromText = async (req: Request, res: Response) => {
  const text = req.body?.text;

  if (!text) {
    return res.status(400).json({ message: "Text is required" });
  }

  const prompt = `
Extract invoice data from the text below.

Return ONLY a valid JSON object using this schema:

{
  "clientName": string,
  "email": string | null,
  "address": string | null,
  "items": {
    "name": string,
    "quantity": number,
    "unitPrice": number
  }[]
}

Do not include markdown or explanations.

Text:
${text}
`;

  try {
    const aiText = await callGemini(prompt);

    const cleaned = aiText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    return res.status(200).json({
      message: "Invoice parsed successfully",
      data: parsed,
    });
  } catch (error) {
    console.error("AI invoice parsing failed:", error);

    return res.status(500).json({
      message: "Failed to parse invoice using AI",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const generateReminderEmail = async (req: Request, res: Response) => {
  const { invoiceId } = req.body;

  if (!invoiceId) {
    return res.status(400).json({ message: "Invoice ID is required" });
  }

  try {
    const invoice = await Invoice.findById(invoiceId);

    // ✅ NULL CHECK FIRST
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    // ✅ Safe after null check
    const dueDateText = invoice.dueDate
      ? new Date(invoice.dueDate).toLocaleDateString()
      : "N/A";

    const prompt = `
You are a professional and polite accounting assistant.

Write a friendly payment reminder email.

Details:
- Client Name: ${invoice.billTo.clientName}
- Invoice Number: ${invoice.invoiceNumber}
- Amount Due: ${invoice.total.toFixed(2)}
- Due Date: ${dueDateText}

Tone:
- Friendly
- Professional
- Clear
- Concise

Start the email with "Subject:".
`;

    const aiText = await callGemini(prompt);

    if (!aiText) {
      return res.status(500).json({ message: "Empty response from AI" });
    }

    return res.status(200).json({
      message: "Reminder email generated successfully",
      email: aiText.trim(),
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error generating reminder email:", error.message);
      return res.status(500).json({
        message: "Failed to generate reminder email",
        details: error.message,
      });
    }
  }
};
