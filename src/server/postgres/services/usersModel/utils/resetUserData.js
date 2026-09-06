import { prisma } from "../../../index.js";
var defaultReportLoadingState = {
  queueLength: 0,
  queueCapacity: 0,
  loadingInProgress: false,
  lastReportRequestTimestamp: 0,
  isReportLoadingDelayed: false,
  isReportLoadingIsStopped: false,
  loadingStopReason: "",
  reportsQueue: [],
  abandonedReports: [],
  emptyReportPeriods: [],
};

export async function resetUserData(userId) {
  return await prisma.$transaction(async (tx) => {
    await tx.taxParams.delete({ where: { userId } });
    await tx.token.update({ where: { userId }, data: { token: "", tokenHasBeenRemoved: false } });
    await tx.reports.update({ where: { userId }, data: { reports: [], reportsWithAccountedFinances: [] } });

    // await tx.reportTree.update({ where: { userId }, data: { years: [] } });
    // await tx.listGoods.update({ where: { userId }, data: { listGoods: [] } });
    // await tx.reportLoadingStates.update({ where: { userId }, data: defaultReportLoadingState });
  });
}
