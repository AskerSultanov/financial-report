import { prisma } from "../../../index.js";

export async function setLastReportRequestTimestamp(userId, client = prisma) {
  await client.reportLoadingState.update({
    where: { userId },
    data: { lastReportRequestTimestamp: new Date() },
  });
}
