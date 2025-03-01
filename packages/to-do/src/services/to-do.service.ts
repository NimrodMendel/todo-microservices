import { Todo } from "../models/to-do.model";

class TodoService {
  async getToDos() {
    try {
      const todos = await Todo.find();

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

  async createTodo(payload: any) {}

  async updateTodo() {}

  async deleteTodo(id: string) {}
}

export { TodoService };
