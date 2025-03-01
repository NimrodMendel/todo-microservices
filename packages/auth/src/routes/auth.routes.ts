import express from "express";
import { AuthController } from "../controllers/auth.controller";

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post("/login", async (req, res) => {
  try {
    await authController.login(req, res);
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

authRouter.post("/signup", async (req, res) => {
  try {
    await authController.signup(req, res);
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { authRouter };
