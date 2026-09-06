import parseJwt from "./utils/parseJwt.js";
import checkTokenExpiry from "./utils/checkTokenExpiry.js";
import { getWBTokenByUserId } from "../../../database/modelsUtil/tokens/index.js";

import * as prismaServices from "../../../postgres/services/index.js";

var checkTokenExistService = async (userId) => {
  var { token } = await getWBTokenByUserId(userId);
  var tokenFromPg =
    await prismaServices.tokenModelServices.getWBTokenByUserId(userId);

  if (!token && !tokenFromPg.token) {
    return { tokenIsMissing: true, isExpired: false, token: "" };
  }

  var tokenPayload = parseJwt(token);

  var { isExpired } = checkTokenExpiry(tokenPayload);

  if (isExpired) {
    return { isExpired, tokenIsMissing: false, token: "" };
  }

  return { token, isExpired: false, tokenIsMissing: false };
};

export default checkTokenExistService;
