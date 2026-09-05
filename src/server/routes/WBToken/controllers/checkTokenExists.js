import parseJwt from "../services/parseJwt.js";
import checkTokenExpiry from "../services/checkTokenExpiry.js";
import { getWBTokenByUserId } from "../../../database/modelsUtil/tokens/index.js";

var tokenMissingMsg = "Отсутствует токен личного кабинета WB";
var tokenExpiryMsg = "Истек срок действия токена личного кабинета WB";

var checkTokenExistsController = async (req, res, next) => {
  var { userId } = req.body;

  var { token } = await getWBTokenByUserId(userId);

  if (!token) {
    return res.json({ errorText: tokenMissingMsg });
  }

  var tokenPayload = parseJwt(token);

  var { isExpired } = checkTokenExpiry(tokenPayload);

  if (isExpired) {
    return res.json({ errorText: tokenExpiryMsg });
  }

  req.body.wbtoken = token;

  next();
};

export default checkTokenExistsController;
