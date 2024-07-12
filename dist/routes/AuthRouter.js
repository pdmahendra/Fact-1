import express from "express";
const router = express.Router();
import { registerC, loginC } from "../controllers/AuthController.js";
router.post("/register", registerC);
router.post("/login", loginC);
export default router;
