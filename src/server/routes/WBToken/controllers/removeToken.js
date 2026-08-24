import { removeTokenFromDb } from "../../..//database/modelsUtil/tokens/index.js";

var removeToken = async (req, res) => {
  var { userId } = req.body;

  var success = await tokenModelUtils.removeTokenFromDb(userId);

  return success ? res.sendStatus(200) : res.sendStatus(304);
};

export default removeToken;
