import amqp, { ConsumeMessage } from "amqplib";
import { Config } from "../config/config";
import { TodoService } from "../services/to-do.service";

const listenUserCreated = async () => {
  try {
    const connection = await amqp.connect(Config.rabbitmq_url);
    const channel = await connection.createChannel();
    const exchange = "userEvents";
    const todoService = new TodoService();

    await channel.assertExchange(exchange, "fanout", { durable: true });

    const { queue } = await channel.assertQueue("", { exclusive: true });
    console.log(`Waiting for messages in queue: ${queue}`);
    await channel.bindQueue(queue, exchange, "");

    channel.consume(queue, async (msg: ConsumeMessage | null) => {
      if (msg) {
        const payload = JSON.parse(msg.content.toString());
        console.log("Received event:", payload);

        if (payload.event === "user.created") {
          await todoService.createTodo({
            title: "Welcome to AwesomeTodo",
            description: "This is a new Todo item!",
            userId: payload.userId,
          });
        }
        console.log("Successfully created item!");
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error("Error consuming user.created event:", error);
  }
};

export { listenUserCreated };
