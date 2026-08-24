var updateReportLoadingStoppedStatus = async (reportLoadingStateModel, userId, newStatus, loadingStopReason = "", session) => {
  var sessionOptions = session ? { session: session } : {};
  await reportLoadingStateModel.updateOne({ userId }, { $set: { isReportLoadingIsStopped: newStatus, loadingStopReason } }, { ...sessionOptions });
};
export default updateReportLoadingStoppedStatus;
