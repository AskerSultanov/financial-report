import { tokenCollection } from "../../connections/index.js";

import saveWBTokenToDb from "./services/saveWBTokenToDb.js";
import removeTokenFromDb from "./services/removeTokenFromDb.js";
import getWBTokenByUserId from "./services/getWBTokenByUserId.js";
import updateWBTokenLastUsedTimestamp from "./services/updateWBTokenLastUsedTimestamp.js";

var tokenCollectionServices = {
  getWBTokenByUserId: (userId, session, updateLastUsedNow) => getWBTokenByUserId(tokenCollection, userId, session, updateLastUsedNow),

  saveWBTokenToDb: (userId, token, session) => saveWBTokenToDb(tokenCollection, userId, token, session),

  updateWBTokenLastUsedTimestamp: (userId, session) => updateWBTokenLastUsedTimestamp(tokenCollection, userId, session),

  removeTokenFromDb: (userId) => removeTokenFromDb(tokenCollection, userId),
};

export default tokenCollectionServices;
