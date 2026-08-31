import { tokenModel } from "../../../models/index.js";

var saveWBTokenToDb = async (userId, token, session) => {
  var result = await tokenModel.updateOne(
    { userId },
    {
      $set: { token, lastUsed: new Date(), tokenHasBeenRemoved: false },
    },
    {
      session: session,
    },
  );

  return result.modifiedCount;
};

export default saveWBTokenToDb;
