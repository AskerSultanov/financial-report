import { prisma } from "../../../index.js";

export async function getReportsByUserId(client = prisma, userId, selectedFields, reportIds) {
  if (reportIds) {
    var reports = await client.sku.findMany({ where: { userId, reportId: { in: reportIds } }, select: selectedFields });
    return { reports };
  }

  if (selectedFields) {
    var reports = await client.sku.findMany({ where: { userId }, select: selectedFields });
    return { reports };
  }

  var reports = await client.sku.findMany({ where: { userId } });
  return { reports };
}
