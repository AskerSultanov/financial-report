import { tokenModel } from "../../../models/index.js";

var mskTimeOffsetInMs = 10_800_000;

var updateWBTokenLastUsedTimestamp = async (userId, session) => {
  var sessionOpt = session ? { session: session } : {};
  await tokenModel.updateOne({ userId }, { $set: { lastUsed: Date.now() + mskTimeOffsetInMs } }, { ...sessionOpt });
};

export default updateWBTokenLastUsedTimestamp;
