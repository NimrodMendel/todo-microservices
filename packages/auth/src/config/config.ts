import dotenv from "dotenv";

dotenv.config();

export class Config {
  static app_port = parseInt(process.env.PORT as string, 10);
  static salt_rounds = parseInt(process.env.SALT_ROUNDS as string, 10);
  static jwt_secret = process.env.JWT_SECRET;
  static mongodb_user = process.env.MONGO_INITDB_ROOT_USERNAME;
  static mongodb_pasword = process.env.MONGO_INITDB_ROOT_PASSWORD;
  static mongodb_host = process.env.DB_HOST;
  static database = process.env.MONGO_INITDB_DATABASE;
  static db_port = process.env.MONGODB_DOCKER_PORT;
  static db_uri = `mongodb://${Config.mongodb_user}:${Config.mongodb_pasword}@${Config.mongodb_host}:${Config.db_port}/${Config.database}?authSource=admin`;
}
