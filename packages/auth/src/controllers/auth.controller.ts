import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { LoginDto } from "../dto/login.dto";
import { SignupDto } from "../dto/signup.dto";
import { AuthError } from "../errors/auth.error";

class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const payload: LoginDto = { email, password };
      const result = await this.authService.login(payload);
      res.status(200).json({ data: result });
    } catch (error) {
      if (error instanceof AuthError) {
        return res.status(error.status).json({ message: error.message });
      }
      console.error("Login Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async signup(req: Request, res: Response) {
    try {
      const { email, password, firstName, lastName } = req.body;
      const payload: SignupDto = { email, password, firstName, lastName };
      const result = await this.authService.signup(payload);
      res.status(201).json({ data: result });
    } catch (error) {
      if (error instanceof AuthError) {
        return res.status(error.status).json({ message: error.message });
      }
      console.error("Signup Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export { AuthController };
