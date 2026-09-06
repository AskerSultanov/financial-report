import { prisma } from "../../../index.js";

export async function removeReportFromAccounted(userId, reportId) {
  await prisma.$transaction(async (tx) => {
    await tx.sku.updateMany({
      where: { userId, reportId },
      data: { isFinancesAccounted: false },
    });

    await tx.reportsWithAccountedFinances.delete({
      where: { userId_reportId: { userId, reportId } },
    });
  });
}
