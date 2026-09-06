import { prisma } from "../../../index.js";

export async function removeReportFromReportPeriods(
  userId,
  dateFrom,
  dateTo,
  client = prisma,
) {
  await client.reportPeriods.delete({
    where: { userId_dateFrom_dateTo: { userId, dateFrom, dateTo } },
  });
}
