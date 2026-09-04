import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";

var removeUserController = async (req, res, next) => {
  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      await dbUtils.userModelUtils.deleteUserFromDb(req.body.userId, session);
      res.sendStatus(200);
    });
  } catch (e) {
    res.sendStatus(304);
  } finally {
    if (session.inTransaction()) {
      await session.endSession();
    }
  }
};

export default removeUserController;
