import { dbClient } from "../../../database/index.js";
import listGoodsLoader from "../services/listGoodsLoader.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import removeDublicates from "../services/removeDublicates.js";

var skuNamesStub = null;

var { saveListGoodsToDb, getListGoodsFromDb } = dbUtils.goodsModelUtils;

var loadListGoodsController = async (req, res, next) => {
  var { userId, wbtoken } = req.body;

  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      var { listGoods } = await getListGoodsFromDb(
        userId,
        skuNamesStub,
        session,
      );

      var { listGoodsFromWBAPI } = await listGoodsLoader(userId, wbtoken);

      var { dedublicatedListGoods } = removeDublicates(
        listGoods,
        listGoodsFromWBAPI,
      );

      await saveListGoodsToDb(userId, dedublicatedListGoods, session);

      return res.json({ listGoods: dedublicatedListGoods, errorText: "" });
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(304);
  } finally {
    if (session) {
      await session.endSession();
    }
  }
};

export default loadListGoodsController;
