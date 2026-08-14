var updateReportLoadingStoppedStatus = async (collection, userId, newStatus, loadingStopReason = "", session) => {
  var sessionOptions = session ? { session: session } : {};
  await collection.updateOne({ userId }, { $set: { isReportLoadingIsStopped: newStatus, loadingStopReason } }, { ...sessionOptions });
};
export default updateReportLoadingStoppedStatus;
