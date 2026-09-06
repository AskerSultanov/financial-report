import { prisma } from "../../../index.js";

var mskTimeOffsetInMs = 3 * 60 * 60 * 1000;

export async function setLastReportRequestTimestamp(userId, client = prisma) {
  await client.reportLoadingState.update({ where: { userId }, data: { lastReportRequestTimestamp: Date.now() + mskTimeOffsetInMs } });
}
