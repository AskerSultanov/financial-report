import { prisma } from "../../../index.js";

export async function getReportPeriods(userId, client = prisma) {
  var reportPeriods = await client.reportPeriods.findMany({
    where: { userId },
  });

  return { reportPeriods };
}
