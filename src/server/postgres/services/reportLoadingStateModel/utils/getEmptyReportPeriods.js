import { prisma } from "../../../index.js";

export async function getEmptyReportPeriods(userId, client = prisma) {
  return await client.reportsQueue.findMany({ where: { userId }, select: { isEmptyPeriod: true } });
}
