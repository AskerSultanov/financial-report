import { prisma } from "../../../index.js";

export async function addReportToEmptyReportPeriods(userId, dateFrom, dateTo, client = prisma) {
  return await client.reportsQueue.create({ data: { userId, dateFrom, dateTo } });
}
