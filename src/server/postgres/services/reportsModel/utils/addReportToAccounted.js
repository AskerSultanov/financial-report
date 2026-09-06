import { prisma } from "../../../index.js";

export async function addReportToAccounted(client = prisma, userId, reportId) {
  return await client.sku.updateMany({
    where: { userId, reportId },
    data: {
      isFinancesAccounted: true,
      financesAccountedAt: new Date(Date.now()),
    },
  });
}
