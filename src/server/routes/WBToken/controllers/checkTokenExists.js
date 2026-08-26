import { getWBTokenByUserId } from "../../../database/modelsUtil/tokens/index.js";

var checkTokenExists = async (req, res, next) => {
  var { userId } = req.params;

  var { token } = await getWBTokenByUserId(userId);

  var tokenIsExist = false;

  return token.length ? res.json({ tokenIsExist: true }) : res.json({ tokenIsExist });
};

export default checkTokenExists;
