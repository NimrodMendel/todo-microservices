import express from "express";
import { AuthController } from "../controllers/auth.controller";

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post("/login", async (req, res) => {
  await authController.login(req, res);
});

authRouter.post("/signup", async (req, res) => {
  await authController.signup(req, res);
});

export { authRouter };
