import { prisma } from "../../../index.js";

export async function updateReportLoadingStoppedStatus(userId, newStatus, client = prisma) {
  return await client.reportLoadingState.update({ where: { userId }, data: { isReportLoadingIsStopped: newStatus } });
}
