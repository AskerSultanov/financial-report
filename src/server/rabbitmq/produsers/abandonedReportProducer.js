import { channel } from "../index.js";

var routingKey = "abandoned";
var exchangeName = "report-loader";

export var abandonedReportProducer = async (userId) => channel.publish(exchangeName, routingKey, { userId }, { persistent: true });
