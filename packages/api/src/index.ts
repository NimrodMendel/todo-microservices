import express, { Request, Response } from "express";
import { Config } from "./config";
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import cors from "cors";
import proxy from "express-http-proxy";
import morgan from "morgan";
import helmet from "helmet";
import { authMiddleware } from "./middleware/auth";

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
app.use(
  cors({
    origin: "http://dashboard:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(helmet());
app.use(
  morgan("common", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from API Gateway");
});

app.use("/auth", proxy(Config.auth_address!));
app.use("/to-do", authMiddleware, proxy(Config.todo_address!));

app.listen(Config.app_port, () => {
  console.log(
    `API Gateway is accessible on http://localhost:${Config.app_port}`
  );
});
