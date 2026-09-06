import parseJwt from "./utils/parseJwt.js";
import getTokenDetails from "./utils/getTokenDetails.js";
import { getWBTokenByUserId } from "../../../database/modelsUtil/tokens/index.js";

import * as prismaServices from "../../../postgres/services/index.js";

var getTokenDataService = async (userId) => {
  var { token, lastUsed } = await getWBTokenByUserId(userId);
  var tokenFromPg =
    await prismaServices.tokenModelServices.getWBTokenByUserId(userId);

  if (!token.length && !tokenFromPg.token.length) {
    return { tokenIsExist: false, tokenDetails: null };
  }

  var tokenPayload = parseJwt(token);
  var tokenDetails = getTokenDetails(tokenPayload);

  tokenDetails.lastUsed = lastUsed;

  return { tokenDetails, tokenIsExist: true };
};

export default getTokenDataService;
