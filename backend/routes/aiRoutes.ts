import express from "express";

import {
  parseInvoiceFromText,
  generateReminderEmail,
  getDashboardSummary,
} from "../controllers/aiController.js";

import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/parse-text", protect, parseInvoiceFromText);

export default router;
