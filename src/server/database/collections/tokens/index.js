import { tokenModel } from "../../models/index.js";

import saveWBTokenToDb from "./services/saveWBTokenToDb.js";
import removeTokenFromDb from "./services/removeTokenFromDb.js";
import getWBTokenByUserId from "./services/getWBTokenByUserId.js";
import updateWBTokenLastUsedTimestamp from "./services/updateWBTokenLastUsedTimestamp.js";

var tokenCollectionServices = {
  getWBTokenByUserId: (userId, session, updateLastUsedNow) => getWBTokenByUserId(tokenModel, userId, session, updateLastUsedNow),

  saveWBTokenToDb: (userId, token, session) => saveWBTokenToDb(tokenModel, userId, token, session),

  updateWBTokenLastUsedTimestamp: (userId, session) => updateWBTokenLastUsedTimestamp(tokenModel, userId, session),

  removeTokenFromDb: (userId) => removeTokenFromDb(tokenModel, userId),
};

export default tokenCollectionServices;
