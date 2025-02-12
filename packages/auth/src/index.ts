import express, { Request, Response } from "express";
import { Config } from "./config/config";
import { authRouter } from "./routes/auth.routes";

const app = express();

app.use("/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(Config.app_port, async () => {
  console.log(`server ready to accept requests on port ${Config.app_port}`);
});
