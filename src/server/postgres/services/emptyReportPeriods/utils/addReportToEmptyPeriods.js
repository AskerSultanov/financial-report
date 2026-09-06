import { prisma } from "../../../index.js";

export async function addReportToEmptyPeriods(
  userId,
  reportId,
  dateFrom,
  dateTo,
  client = prisma,
) {
  await client.emptyReportPeriods.create({
    data: { userId, reportId, dateFrom, dateTo },
  });
}
