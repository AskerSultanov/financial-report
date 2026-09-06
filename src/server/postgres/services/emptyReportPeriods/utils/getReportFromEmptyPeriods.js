import { prisma } from "../../../index.js";

export async function getReportFromEmptyPeriods(
  userId,
  dateFrom,
  dateTo,
  client = prisma,
) {
  return await client.emptyReportPeriods.findUnique({
    where: { userId_dateFrom_dateTo: { userId, dateFrom, dateTo } },
  });
}
