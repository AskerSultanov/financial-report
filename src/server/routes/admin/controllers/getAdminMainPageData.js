import dbUtils from "../../../database/modelsUtil/index.js";

var { getAllUsersFromDb } = dbUtils.userModelUtils;

var getAdminMainPageData = async (req, res, next) => {
  var users = await getAllUsersFromDb();
  return res.json(users);
};

export default getAdminMainPageData;
