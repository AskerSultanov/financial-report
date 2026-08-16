import dbUtils from "../../../database/collections/index.js";

var { getAllUsersFromDb } = dbUtils.userCollectionServices;

var getAdminMainPageData = async (req, res, next) => {
  var users = await getAllUsersFromDb();
  return res.json(users);
};

export default getAdminMainPageData;
