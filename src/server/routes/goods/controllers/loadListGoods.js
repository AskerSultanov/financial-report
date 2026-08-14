import { dbClient } from "../../../database/index.js";
import listGoodsLoader from "../services/listGoodsLoader.js";
import dbUtils from "../../../database/collections/index.js";

var updateLastUsedTimestampNow = true;

var { saveListGoodsToDb } = dbUtils.goodsCollectionServices;
var { getWBTokenByUserId, updateLastUsedTimestamp } = dbUtils.tokenCollectionServices;

var loadListGoods = async (req, res, next) => {
  var { userId } = req.body;

  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      var { token } = await getWBTokenByUserId(userId, session, updateLastUsedTimestampNow);

      if (!token) {
        return res.status(400).json({ msg: "В первую очередь нужно загрузить токен личного кабинета WB" });
      } else {
        var { listGoodsFromWBAPI } = await listGoodsLoader(userId, token);

        await saveListGoodsToDb(userId, listGoodsFromWBAPI, session);

        return res.json({ listGoods: listGoodsFromWBAPI });
      }
    });
  } catch (e) {
    return res.sendStatus(304);
  } finally {
    if (session) {
      await session.endSession();
    }
  }
};

export default loadListGoods;
