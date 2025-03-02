import { CreateTodoDto } from "../dto/createToDo.dto";
import { UpdateTodoDto } from "../dto/updateTodo.dto";
import { Todo } from "../models/to-do.model";

class TodoService {
  async getToDos(userId: string) {
    try {
      const todos = await Todo.find({ userId, isActive: true });

      return todos;
    } catch (error) {
      console.error(error);
    }
  }

  async getTodoById(id: string) {
    try {
      const todo = await Todo.findOne({ _id: id });
      return todo;
    } catch (error) {
      console.error(error);
    }
  }

  async createTodo(payload: CreateTodoDto) {
    const { title, description, userId } = payload;

    const newTodo = new Todo({
      title,
      description,
      userId,
    });

    await newTodo.save();

    return newTodo;
  }

  async updateTodo(id: string, payload: UpdateTodoDto) {
    const todo = await this.getTodoById(id);

    if (!todo) {
      throw new Error("Invalid parameters: To-Do not found");
    }

    const updated = await Todo.updateOne({ _id: id }, { $set: { ...payload } });

    return updated;
  }

  async deleteTodo(id: string) {
    const todo = await this.getTodoById(id);

    if (!todo) {
      throw new Error("Illegal params");
    }

    const deletedTodo = await this.updateTodo(id, { isActive: false });
  }

  async markAsCompleted(id: string) {
    const todo = await this.getTodoById(id);

    if (!todo) {
      throw new Error("Illegal params");
    }

    const completedTodo = await this.updateTodo(id, { isCompleted: true });
  }
}

export { TodoService };
