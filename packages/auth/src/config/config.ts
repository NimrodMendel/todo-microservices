import dotenv from "dotenv";

dotenv.config();

export class Config {
  static app_port = parseInt(process.env.PORT as string, 10);
  static salt_rounds = parseInt(process.env.SALT_ROUNDS as string, 10);
  static jwt_secret = process.env.JWT_SECRET;
  static database_uri = process.env.DB_URI;
}
