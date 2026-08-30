import { queues } from "./queues.js";
import amqp from "amqp-connection-manager";

var connection = amqp.connect(process.env.RABBITMQ_URL);

export var channel = connection.createChannel({
  json: true,
  setup: async (channel) => {
    for (var { queueName, queueOptions } of queues) {
      await channel.assertQueue(queueName, queueOptions);
      console.log({ queueName });
    }
  },
});
  channel.sendToQueue("report.loading", { userId }, { persistent: true }).catch((e) => console.log({ e }));
