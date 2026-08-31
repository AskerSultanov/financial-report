import { tokenModel } from "../../../models/index.js";

var getWBTokenByUserId = async (userId, session, updateLastUsedNow = false) => {
  var sessionOpt = session ? { session: session } : {};

  var data;

  if (updateLastUsedNow) {
    data = await tokenModel.findOneAndUpdate({ userId }, { $set: { lastUsed: new Date() } }, { returnDocument: "before", ...sessionOpt });
  } else {
    data = await tokenModel.findOne({ userId }, null, { ...sessionOpt });
  }

  var { token, lastUsed } = data;

  if (lastUsed) {
    lastUsed = lastUsed.toLocaleString("ru-RU", {
      timeZone: "Europe/Moscow",
    });
  }

  return { token, lastUsed };
};

export default getWBTokenByUserId;
