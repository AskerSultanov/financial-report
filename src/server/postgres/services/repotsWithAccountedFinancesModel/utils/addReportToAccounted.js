import { prisma } from "../../../index.js";

export async function addReportToAccounted(
  userId,
  reportId,
  dateFrom,
  dateTo,
  client = prisma,
) {
  await client.$transaction(async (tx) => {
    await tx.reportsWithAccountedFinances.create({
      data: {
        userId,
        reportId,
        dateFrom,
        dateTo,
        financesAccountedAt: new Date(),
      },
    });

    await tx.sku.updateMany({
      where: { userId, reportId },
      data: { isFinancesAccounted: true },
    });
  });
}
