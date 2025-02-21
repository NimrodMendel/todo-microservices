import dotenv from "dotenv";

dotenv.config();

class Config {
  static app_port = process.env.PORT;
}

export { Config };
