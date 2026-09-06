import { prisma } from "../../../index.js";

export async function getReportLoadingState(userId, client = prisma, selectedFields = {}) {
  return await client.reportLoadingState.findUnique({ where: { userId }, include: { reportsQueue: true } });
}
