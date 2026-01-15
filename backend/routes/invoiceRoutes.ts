import express from "express";
import {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
} from "../controllers/invoiceController.js";

import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createInvoice).get(protect, getInvoices);

export default router;
