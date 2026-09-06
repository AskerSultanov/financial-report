import { prisma } from "../../../index.js";

var defaultReportLoadingState = {
  queueCapacity: 0,
  loadingInProgress: false,
  lastReportRequestTimestamp: 0,
  isReportLoadingIsStopped: false,
  loadingStopReason: "",
  freshReportPeriodIndex: -1,
};

export async function deleteReportLoadingState(userId, client = prisma) {
  return await client.reportLoadingState.update({
    where: { userId },
    data: { ...defaultReportLoadingState, reportsQueue: { deleteMany: {} } },
  });
}
