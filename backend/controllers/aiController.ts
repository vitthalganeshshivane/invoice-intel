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
