import { prisma } from "../../../index.js";

export async function pushToReportsQueue(userId, periods, client = prisma, needToResetAbandonedReports = false) {
  periods.forEach((period) => (period.userId = userId));

  if (needToResetAbandonedReports) {
    await client.reportsQueue.deleteMany({ where: { userId, failedCount: { gt: 2 } } });
  }

  return await client.reportsQueue.createMany({ data: periods });
}
