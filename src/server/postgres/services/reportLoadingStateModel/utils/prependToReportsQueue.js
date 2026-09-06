import { prisma } from "../../../index.js";

export async function prependToReportsQueue(userId, dateFrom, dateTo, client = prisma) {
  return await client.reportsQueue.create({ data: { userId, dateFrom, dateTo, queuePosition: 0 } });
}
