import { removeTokenFromDb } from "../../../database/modelsUtil/tokens/index.js";

var removeToken = async (req, res) => {
  var { userId } = req.body;

  var { removedToken } = await removeTokenFromDb(userId);

  return removedToken ? res.sendStatus(200) : res.sendStatus(404);
};

export default removeToken;
