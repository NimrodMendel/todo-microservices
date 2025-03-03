import express, { Request, Response } from "express";
import { todoRouter } from "./routes/to-do.routes";
import { connectToDb } from "./config/db";
import { Config } from "./config/config";
import { listenUserCreated } from "./messaging/rabbitmq.subscriber";

const app = express();

app.use(express.json());

app.use("/", todoRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

connectToDb().then(() =>
  app.listen(Config.app_port, async () => {
    console.log(`server ready to accept requests on port ${Config.app_port}`);
    listenUserCreated();
  })
);
