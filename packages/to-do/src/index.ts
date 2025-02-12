import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(3020, async () => {
  console.log(`server ready to accept requests on port ${3020}`);
});
