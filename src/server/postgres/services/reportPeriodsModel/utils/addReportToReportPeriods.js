import { prisma } from "../../../index.js";

export async function addReportToReportPeriods(report, client = prisma) {
  await client.reportPeriods.create({ data: report });
}
