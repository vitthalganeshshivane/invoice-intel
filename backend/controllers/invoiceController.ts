import { Request, Response } from "express";
import Invoice, { IItem } from "../models/Invoice.js";

export const createInvoice = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    const {
      invoiceNumber,
      invoiceDate,
      dueDate,
      billFrom,
      billTo,
      items,
      notes,
      paymentTerms,
    } = req.body;

    let subTotal = 0;
    let taxTotal = 0;
    items.forEach((item: IItem) => {
      subTotal += item.unitPrice * item.quantity;
      taxTotal +=
        (item.unitPrice * item.quantity * (item.taxPercent || 0)) / 100;
    });

    const total = subTotal + taxTotal;

    const invoice = new Invoice({
      user,
      invoiceNumber,
      invoiceDate,
      dueDate,
      billFrom,
      billTo,
      items,
      notes,
      paymentTerms,
      subTotal,
      taxTotal,
      total,
    });

    await invoice.save();

    res.status(200).json(invoice);
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Error creating invoice", error: error.message });
    }
  }
};

export const getInvoices = async (req: Request, res: Response) => {
  try {
    const invoices = await Invoice.find().populate("user", "name email");
    res.status(200).json(invoices);
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Error creating invoice", error: error.message });
    }
  }
};

export const getInvoiceById = async (req: Request, res: Response) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate(
      "user",
      "name, email"
    );

    if (!invoice) {
      res.status(404).json({ message: "Invoice not found" });
      return;
    }

    res.status(200).json(invoice);
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Error creating invoice", error: error.message });
    }
  }
};

export const updateInvoice = async (req: Request, res: Response) => {
  try {
    const {
      invoiceNumber,
      invoiceDate,
      dueDate,
      billFrom,
      billTo,
      items,
      notes,
      paymentTerms,
    } = req.body;

    let subTotal = 0;
    let taxTotal = 0;
    if (items && items.length > 0) {
      items.forEach((item: IItem) => {
        subTotal += item.unitPrice * item.quantity;
        taxTotal +=
          (item.unitPrice * item.quantity * (item.taxPercent || 0)) / 100;
      });
    }

    const total = subTotal + taxTotal;

    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      {
        invoiceNumber,
        invoiceDate,
        dueDate,
        billFrom,
        billTo,
        items,
        notes,
        paymentTerms,
        subTotal,
        taxTotal,
        total,
      },
      { new: true }
    );

    if (!updatedInvoice) {
      res.status(404).json({ message: "Invoice not found" });
      return;
    }

    res.status(200).json({
      message: "Invoice updated successfull",
      updatedInvoice: updatedInvoice,
    });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Error updating invoice", error: error.message });
    }
  }
};
