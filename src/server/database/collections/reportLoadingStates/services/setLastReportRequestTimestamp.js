var mskTimeOffsetInMs = 10_800_000;

var setLastReportRequestTimestamp = async (reportLoadingStateModel, userId, session) =>
  await reportLoadingStateModel.updateOne({ userId }, { $set: { lastReportRequestTimestamp: Date.now() + mskTimeOffsetInMs } }, { session: session });

export default setLastReportRequestTimestamp;
