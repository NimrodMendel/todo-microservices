import express, { Request, Response } from "express";
import { todoRouter } from "./routes/to-do.routes";

const app = express();

app.use(express.json());

app.use("/", todoRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(3020, async () => {
  console.log(`server ready to accept requests on port ${3020}`);
});
