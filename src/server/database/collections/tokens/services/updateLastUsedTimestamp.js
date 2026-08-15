var mskTimeOffsetInMs = 10_800_000;

var updateLastUsedTimestamp = async (collection, userId, session) => {
  var sessionOpt = session ? { session: session } : {};
  await collection.updateOne({ userId }, { $set: { lastUsed: Date.now() + mskTimeOffsetInMs } }, { ...sessionOpt });
};

export default updateLastUsedTimestamp;
