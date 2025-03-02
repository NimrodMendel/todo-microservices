import { Request, Response } from "express";
import { TodoService } from "../services/to-do.service";
import { CreateTodoDto } from "../dto/createToDo.dto";
import { UpdateTodoDto } from "../dto/updateTodo.dto";

class TodoController {
  private todoService: TodoService;

  constructor() {
    this.todoService = new TodoService();
  }

  async getToDos(req: Request, res: Response) {
    try {
      const userId = req.user.id;

      if (!userId) {
        throw new Error("Illegal params!");
      }

      const result = await this.todoService.getToDos(userId);

      res.status(200).json({ data: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getTodoById(req: Request, res: Response) {
    try {
      const todoId = req.params.id;

      if (!todoId) {
        throw new Error("Illegal params!");
      }

      const result = await this.todoService.getTodoById(todoId);

      res.status(200).json({ data: result });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  }

  async createTodo(req: Request, res: Response) {
    try {
      const payload: CreateTodoDto = req.body;

      if (!payload.title || !payload.description || !payload.userId) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const result = await this.todoService.createTodo(payload);

      res.status(201).json({ data: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateTodo(req: Request, res: Response) {
    try {
      const { title, description } = req.body;
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({ message: "Missing required fields: ID" });
      }

      const payload: UpdateTodoDto = {
        title,
        description,
      };

      const result = await this.todoService.updateTodo(id, payload);

      res.status(200).json({ data: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async markAsCompleted(req: Request, res: Response) {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({ message: "To-Do ID is required" });
      }

      const result = await this.todoService.markAsCompleted(id);
      res.status(200).json({ data: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteTodo(req: Request, res: Response) {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({ message: "To-Do ID is required" });
      }

      const result = await this.todoService.deleteTodo(id);
      res.status(200).json({ data: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export { TodoController };
