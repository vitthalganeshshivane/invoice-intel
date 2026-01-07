import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
  updateUserProfile,
} from "../controllers/authController.js";

import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
