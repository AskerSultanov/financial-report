import { prisma } from "../../../index.js";

export async function getEmptyReportPeriods(userId, client = prisma) {
  var emptyReportPeriods = await client.emptyReportPeriods.findMany({
    where: { userId },
  });

  return { emptyReportPeriods };
}
