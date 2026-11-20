import dbUtils from "../../../database/modelsUtil/index.js";

var { deleteUsersFromDb } = dbUtils.userModelUtils;

var deleteUsersController = async (req, res, next) => {
  var adminUserId = req.payload.userId;

  await deleteUsersFromDb(adminUserId);
  return res.sendStatus(200);
};

export default deleteUsersController;
