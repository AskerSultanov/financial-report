var mskTimeOffsetInMs = 10_800_000;

var setLastReportRequestTimestamp = async (collection, userId, session) =>
  await collection.updateOne({ userId }, { $set: { lastReportRequestTimestamp: Date.now() + mskTimeOffsetInMs } }, { session: session });

export default setLastReportRequestTimestamp;
