import dbUtils from "../../../database/collections/index.js";

var { getWBTokenByUserId } = dbUtils.tokenCollectionServices;

var checkTokenExists = async (req, res, next) => {
  var { userId } = req.params;

  var { token } = await getWBTokenByUserId(userId);

  var tokenIsExist = false;

  return token.length ? res.json({ tokenIsExist: true }) : res.json({ tokenIsExist });
};

export default checkTokenExists;
