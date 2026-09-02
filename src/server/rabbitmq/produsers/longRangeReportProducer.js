import { channel } from "../index.js";

var queueName = "long.range.report.loading";

export var longRangeReportProducer = async (data) => {
  try {
    var json = JSON.stringify(data);
    var buffer = Buffer.from(json);

    channel.sendToQueue(queueName, buffer);
  } catch (e) {}
};
