import express, { Request, Response } from "express";
import { Config } from "./config";
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import cors from "cors";
import proxy from "express-http-proxy";

const app = express();

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
});

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 6,
  delayMs: () => 500,
});

app.use(limiter);
app.use(speedLimiter);
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from API Gateway");
});

app.use("/auth", proxy("http://auth:3010"));
app.use("/to-do", proxy("http://to-do:3020"));

app.listen(Config.app_port, () => {
  console.log(
    `API Gateway is accessible on http://localhost:${Config.app_port}`
  );
});
