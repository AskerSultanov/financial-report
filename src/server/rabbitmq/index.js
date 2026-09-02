import { queues } from "./queues.js";
import amqp from "amqp-connection-manager";

var url = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PWD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`;

var connection = amqp.connect(url);

export var channel = connection.createChannel({
  json: true,
  confirm: true,
  setup: async (channel) => {
    for (var { queueName, queueOptions } of queues) {
      await channel.assertQueue(queueName, queueOptions);
    }
  },
});
