import { DatabaseError } from "../../../../customError/index.js";

var mskTimeOffsetInMs = 10_800_000;

var getWBTokenByUserId = async (collection, userId, session, updateLastUsedNow = false) => {
  try {
    var sessionOpt = session ? { session: session } : {};

    var data;

    if (updateLastUsedNow) {
      data = await collection.findOneAndUpdate(
        { userId },
        { $set: { lastUsed: Date.now() + mskTimeOffsetInMs } },
        { returnDocument: "before", ...sessionOpt },
      );
    } else {
      data = await collection.findOne({ userId }, null, { ...sessionOpt });
    }

    return { token: data.token, lastUsed: data?.lastUsed };
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

export default getWBTokenByUserId;
