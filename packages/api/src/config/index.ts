import dotenv from "dotenv";

dotenv.config();

class Config {
  static app_port = process.env.PORT;
  static auth_address = process.env.AUTH_ADDRESS;
  static todo_address = process.env.TODO_ADDRESS;
  static jwt_secret = process.env.JWT_SECRET;
}

export { Config };
