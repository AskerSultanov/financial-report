import { prisma } from "../../../index.js";

export async function deleteUserFromDb(userId) {
  return await prisma.$transaction(async (tx) => {
    var userIsExist = await tx.user.findUnique({ where: { userId } });

    if (userIsExist) {
      await tx.user.delete({ where: { userId } });
    }

    var taxParamsIsExist = await tx.taxParams.findFirst({ where: { userId } });

    if (taxParamsIsExist) {
      await tx.taxParams.deleteMany({ where: { userId } });
    }

    var listGoodsIsExist = await tx.listGoods.findFirst({ where: { userId } });

    if (listGoodsIsExist) {
      await tx.listGoods.deleteMany({ where: { userId } });
    }

    var reportPeriodsIsExist = await tx.reportPeriods.findFirst({
      where: { userId },
    });

    if (reportPeriodsIsExist) {
      await tx.reportPeriods.deleteMany({ where: { userId } });
    }

    var reportsIsExist = await tx.sku.findFirst({ where: { userId } });

    if (reportsIsExist) {
      await tx.sku.deleteMany({ where: { userId } });
    }

    var reportsWithAccountedFinancesIsExist =
      await tx.reportsWithAccountedFinances.findFirst({ where: { userId } });

    if (reportsWithAccountedFinancesIsExist) {
      await tx.reportsWithAccountedFinances.deleteMany({ where: { userId } });
    }

    var tokenIsExist = await tx.token.findFirst({ where: { userId } });

    if (tokenIsExist) {
      await tx.token.delete({ where: { userId } });
    }

    var reportLoadingStateIsExist = await tx.reportLoadingState.findFirst({
      where: { userId },
    });

    if (reportLoadingStateIsExist) {
      await tx.reportLoadingState.delete({ where: { userId } });
    }

    var reportsQueueIsExist = await tx.reportsQueue.findFirst({
      where: { userId },
    });

    if (reportsQueueIsExist) {
      await tx.reportsQueue.deleteMany({ where: { userId } });
    }
  });
}
