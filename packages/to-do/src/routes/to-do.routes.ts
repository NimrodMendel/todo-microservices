import { TodoController } from "../controllers/to-do.controller";
import express, { Request, Response } from "express";

const todoController = new TodoController();

const todoRouter = express.Router();

todoRouter.get("/", async (req: Request, res: Response) => {
  try {
    const todos = await todoController.getToDos();

    res.status(200).send({ todos });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

todoRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const todo = await todoController.getTodoById(id);

  res.send({ todo });
});

todoRouter.post("/", async (req: Request, res: Response) => {
  const payload = req.body;

  const newTodo = await todoController.createTodo(payload);

  res.send({ newTodo });
});

todoRouter.put("/:id", async (req: Request, res: Response) => {
  const id = req.params;
  const payload = req.body;

  const updated = await todoController.updateTodo();

  res.send({ tood: updated });
});

todoRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params;

  res.send({ todo: id });
});

export { todoRouter };
