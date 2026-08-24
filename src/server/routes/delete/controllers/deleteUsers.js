import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";

var { deleteUsersFromDb } = dbUtils.userModelUtils;

var deleteUsers = async (req, res, next) => {
  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      await deleteUsersFromDb(session);
      return res.sendStatus(200);
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  } finally {
    if (session) {
      await session.endSession();
    }
  }
};

export default deleteUsers;
