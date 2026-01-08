import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IItem extends Document {
  name: string;
  quantity: number;
  unitPrice: number;
  taxPercent: number;
  total: number;
}

export interface IInvoice extends Document {
  user: Types.ObjectId;
  invoiceNumber: string;
  invoiceDate: Date;
  dueDate?: Date;
  billfrom: {
    businessName: String;
    email: String;
    address: String;
    phone: String;
  };
  billTo: {
    clientName: String;
    email: String;
    address: String;
    phone: String;
  };
  items: IItem[];
  notes?: string;
  paymentTerms: string;
  status: "Paid" | "Unpaid";
  subTotal: number;
  taxTotal: number;
  total: number;
}

const itemSchema = new Schema<IItem>({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  taxPercent: { type: Number, default: 0 },
  total: { type: Number, required: true },
});

const invoiceSchema = new Schema<IInvoice>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    invoiceNumber: {
      type: String,
      required: true,
    },
    invoiceDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
    },
    billfrom: {
      businessName: String,
      email: String,
      address: String,
      phone: String,
    },
    billTo: {
      clientName: String,
      email: String,
      address: String,
      phone: String,
    },
    items: [itemSchema],
    notes: {
      type: String,
    },
    paymentTerms: {
      type: String,
      default: "Net 15",
    },
    status: {
      type: String,
      enum: ["Paid", "Unpaid"],
      default: "Unpaid",
    },
    subTotal: Number,
    taxTotal: Number,
    total: Number,
  },
  { timestamps: true }
);

const Invoice: Model<IInvoice> = mongoose.model<IInvoice>(
  "Invoice",
  invoiceSchema
);

export default Invoice;
