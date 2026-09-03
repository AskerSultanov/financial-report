import amqp from "amqp-connection-manager";
import { exchanges } from "./exchanges.js";

var url = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PWD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`;

var connection = amqp.connect(url);

export var channel = connection.createChannel({
  json: true,
  confirm: true,

  setup: async (channel) => {
    for (var exchange of exchanges) {
      await channel.assertExchange(exchange.name, exchange.type, exchange.options);

      for (var queue of exchange.queues) {
        await channel.assertQueue(queue.name, queue.options);

        for (var key of queue.routingKeys) {
          await channel.bindQueue(queue.name, exchange.name, key);
        }
      }
    }
  },
});
