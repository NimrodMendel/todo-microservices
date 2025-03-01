import { TodoService } from "../services/to-do.service";

class TodoController {
  todoService = new TodoService();

  async getToDos() {
    return await this.todoService.getToDos();
  }

  async getTodoById(id: string) {
    return await this.todoService.getTodoById(id);
  }

  async createTodo(payload: any) {
    return await this.todoService.createTodo(payload);
  }

  async updateTodo() {
    return await this.todoService.updateTodo();
  }

  async deleteTodo(id: string) {
    return await this.todoService.deleteTodo(id);
  }
}

export { TodoController };
