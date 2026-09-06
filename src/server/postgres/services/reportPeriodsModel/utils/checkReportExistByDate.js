import { prisma } from "../../../index.js";

export async function checkReportExistByDate(
  userId,
  dateFrom,
  dateTo,
  client = prisma,
) {
  return await client.reportPeriods.findUnique({
    where: { userId_dateFrom_dateTo: { userId, dateFrom, dateTo } },
  });
}
