import { prisma } from "../../../index.js";

export async function removeReportFromAccounted(userId, reportId, client = prisma) {
  return await client.sku.updateMany({ where: { userId, reportId }, data: { isFinancesAccounted: false } });
}
