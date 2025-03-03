import dotenv from "dotenv";

dotenv.config();

export class Config {
  static app_port = parseInt(process.env.PORT as string, 10);
  static mongodb_user = process.env.MONGO_INITDB_ROOT_USERNAME;
  static mongodb_pasword = process.env.MONGO_INITDB_ROOT_PASSWORD;
  static mongodb_host = process.env.DB_HOST;
  static database = process.env.MONGO_INITDB_DATABASE;
  static db_port = process.env.MONGODB_DOCKER_PORT;
  static db_uri = `mongodb://${Config.mongodb_user}:${Config.mongodb_pasword}@${Config.mongodb_host}:${Config.db_port}/${Config.database}?authSource=admin`;
  static rabbitmq_host = process.env.RABBITMQ_HOST;
  static rabbitmq_default_user = process.env.RABBITMQ_DEFAULT_USER;
  static rabbitmq_default_pass = process.env.RABBITMQ_DEFAULT_PASS;
  static rabbitmq_url = `amqp://${Config.rabbitmq_default_user}:${Config.rabbitmq_default_pass}@${Config.rabbitmq_host}:5672`;
}
