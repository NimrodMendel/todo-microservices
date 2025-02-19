import amqp from "amqplib";
import { Config } from "../config/config";

export const publishUserCreated = async (userId: string) => {
  try {
    const connection = await amqp.connect(Config.rabbitmq_url);
    const channel = await connection.createChannel();
    const exchange = "userEvents";

    await channel.assertExchange(exchange, "fanout", { durable: true });
    const eventPayload = JSON.stringify({ event: "user.created", userId });
    channel.publish(exchange, "", Buffer.from(eventPayload));

    setTimeout(() => {
      channel.close();
      connection.close();
    }, 500);
  } catch (error) {
    console.error("Error publishing user.created event:", error);
  }
};
