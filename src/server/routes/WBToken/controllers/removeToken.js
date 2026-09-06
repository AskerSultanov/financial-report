import * as prismaServices from "../../../postgres/services/index.js";
import { removeTokenFromDb } from "../../../database/modelsUtil/tokens/index.js";

var removeTokenController = async (req, res) => {
  var { userId } = req.body;

  var { removedToken } = await removeTokenFromDb(userId);
  await prismaServices.tokenModelServices.removeWBTokenFromDb(userId);

  return removedToken ? res.sendStatus(200) : res.sendStatus(404);
};

export default removeTokenController;
