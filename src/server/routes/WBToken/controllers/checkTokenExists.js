import dbUtils from "../../../database/modelsUtil/index.js";

var { getWBTokenByUserId } = dbUtils.tokenModelUtils;

var checkTokenExists = async (req, res, next) => {
  var { userId } = req.params;

  var { token } = await getWBTokenByUserId(userId);

  var tokenIsExist = false;

  return token.length ? res.json({ tokenIsExist: true }) : res.json({ tokenIsExist });
};

export default checkTokenExists;
