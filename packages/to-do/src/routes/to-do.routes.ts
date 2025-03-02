import { TodoController } from "../controllers/to-do.controller";
import express, { Request, Response } from "express";

const todoRouter = express.Router();
const todoController = new TodoController();

todoRouter.get("/", async (req: Request, res: Response) => {
  await todoController.getToDos(req, res);
});

todoRouter.get("/:id", async (req: Request, res: Response) => {
  await todoController.getTodoById(req, res);
});

todoRouter.post("/", async (req: Request, res: Response) => {
  await todoController.createTodo(req, res);
});

todoRouter.put("/:id", async (req: Request, res: Response) => {
  await todoController.updateTodo(req, res);
});

todoRouter.patch("/:id/markAsComplete", async (req: Request, res: Response) => {
  await todoController.markAsCompleted(req, res);
});

todoRouter.delete("/:id", async (req: Request, res: Response) => {
  await todoController.deleteTodo(req, res);
});

export { todoRouter };
