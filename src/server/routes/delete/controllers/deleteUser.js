import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/collections/index.js";

var { deleteUserFromDb } = dbUtils.userCollectionServices;

var deleteUser = async (req, res, next) => {
  var { userId } = req.body;
  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      await deleteUserFromDb(userId, session);
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

export default deleteUser;
