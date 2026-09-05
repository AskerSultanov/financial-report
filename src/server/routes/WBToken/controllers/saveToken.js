import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import getTokenDetails from "../services/getTokenDetails.js";
import listGoodsLoader from "../../goods/services/listGoodsLoader.js";
import extractNewSkusFromLIstGoods from "../../goods/services/extractNewSkusFromLIstGoods.js";

var skuNamesStub = null;
var selectedFieldsStub = null;

var { getWBTokenByUserId, saveWBTokenToDb } = dbUtils.tokenModelUtils;
var { saveListGoodsToDb, getListGoodsFromDb, saveNewSkusToDb } =
  dbUtils.goodsModelUtils;

var saveTokenController = async (req, res, next) => {
  var { userId, token, tokenPayload } = req.body;

  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      var currentToken = (await getWBTokenByUserId(userId, session)).token;

      if (currentToken === token) {
        return res.sendStatus(409);
      }

      await saveWBTokenToDb(userId, token, session);

      var { listGoods } = await getListGoodsFromDb(
        userId,
        skuNamesStub,
        selectedFieldsStub,
        session,
      );
      var { listGoodsFromWBAPI } = await listGoodsLoader(userId, token);

      if (!listGoods.length) {
        await saveListGoodsToDb(userId, listGoodsFromWBAPI, session);
      } else {
        var { newSkus } = extractNewSkusFromLIstGoods(
          listGoodsFromWBAPI,
          listGoods,
        );
        await saveNewSkusToDb(userId, newSkus, session);
      }

      var tokenData = getTokenDetails(tokenPayload);

      tokenData.lastUsed = new Date().toLocaleString("ru-RU", {
        timeZone: "Europe/Moscow",
      });

      res.json(tokenData);
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  } finally {
    if (session) {
      await session.endSession();
    }
  }

  next();
};

export default saveTokenController;
