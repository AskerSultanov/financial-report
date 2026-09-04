import parseJwt from "../services/parseJwt.js";
import getTokenDetails from "../services/getTokenDetails.js";
import { getWBTokenByUserId } from "../../../database/modelsUtil/tokens/index.js";

var getTokenDataController = async (req, res, next) => {
  var userId = req.params.userId;

  if (!userId) {
    return res.sendStatus(400);
  }

  var { token, lastUsed } = await getWBTokenByUserId(userId);

  if (!token.length) {
    return res.json({ tokenIsExist: false });
  }

  var tokenPayload = parseJwt(token);
  var tokenDetails = getTokenDetails(tokenPayload);

  tokenDetails.lastUsed = lastUsed;

  return res.json(tokenDetails);
};

export default getTokenDataController;
