import { prisma } from "../../../index.js";

export async function resetAbandonedReports(userId) {
  return await prisma.reportsQueue.deleteMany({ where: { userId, failedCount: { gt: 2 } } });
}
