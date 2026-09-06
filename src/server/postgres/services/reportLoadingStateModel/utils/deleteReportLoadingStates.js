import { prisma } from "../../../index.js";

export async function deleteReportLoadingStates(userId, client = prisma) {
  return await client.reportLoadingState.update({ where: { userId }, data: { freshReportPeriodIndex: -1, reportsQueue: { deleteMany: {} } } });
}
