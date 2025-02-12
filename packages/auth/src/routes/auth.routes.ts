import express, { Request, Response } from "express";
import { login, register } from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    await login(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

authRouter.post("/signup", async (req: Request, res: Response) => {
  try {
    await register(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { authRouter };
