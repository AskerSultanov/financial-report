import { prisma } from "../../../index.js";

var mskTimeOffsetInMs = 3 * 60 * 60 * 1000;

export async function addReportToAccounted(client = prisma, userId, reportId) {
  return await client.sku.updateMany({
    where: { userId, reportId },
    data: { isFinancesAccounted: true, financesAccountedAt: new Date(Date.now() + mskTimeOffsetInMs) },
  });
}
