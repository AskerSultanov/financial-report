import checkTokenExistService from "../services/checkTokenExist.js";

var tokenMissingMsg = "Отсутствует токен личного кабинета WB";
var tokenExpiryMsg = "Истек срок действия токена личного кабинета WB";

var checkTokenExistsController = async (req, res, next) => {
  var { userId } = req.body;

  var { isExpired, tokenIsMissing, token } =
    await checkTokenExistService(userId);

  if (isExpired) {
    return res.json({ errorText: tokenExpiryMsg });
  }

  if (tokenIsMissing) {
    return res.json({ errorText: tokenMissingMsg });
  }

  req.body.wbtoken = token;

  next();
};

export default checkTokenExistsController;
