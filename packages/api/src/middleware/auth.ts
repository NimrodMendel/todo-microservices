import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Config } from "../config";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "Non Shall Pass!" });
    return;
  }

  const token: string | undefined = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Non Shall Pass!" });
    return;
  }

  jwt.verify(token, Config.jwt_secret!, (error, user) => {
    if (error) {
      res.status(403).json({ message: "Non Shall Pass!" });
      return;
    }

    req.headers["x-user-data"] = JSON.stringify(user);
    next(); // Call next() to proceed to the next middleware or route handler.
  });
};

export { authMiddleware };
