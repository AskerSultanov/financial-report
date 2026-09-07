import dbUtils from "../../../database/modelsUtil/index.js";

var deleteUserController = async (req, res, next) => {
  var { userId } = req.body;

  await dbUtils.userModelUtils.deleteUserFromDb(userId);
  return res.sendStatus(200);
};

export default deleteUserController;
