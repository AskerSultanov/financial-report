import Joi from "joi";
import { dbClient } from "../../../database/index.js";
import getTokenDetails from "../services/getTokenDetails.js";
import dbUtils from "../../../database/collections/index.js";
import listGoodsLoader from "../../goods/services/listGoodsLoader.js";
import extractNewSkusFromLIstGoods from "../../goods/services/extractNewSkusFromLIstGoods.js";

var mskTimeOffsetInMs = 10_800_000;
var updateWBTokenLastUsedTimestampNow = true;

var saveToken = async (req, res, next) => {
  var { userId, token, tokenPayload } = req.body;

  var { getWBTokenByUserId, saveWBTokenToDb } = dbUtils.tokenCollectionServices;
  var { saveListGoodsToDb, getListGoodsFromDb, saveNewSkusToDb } = dbUtils.goodsCollectionServices;

  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      var currentToken = (await getWBTokenByUserId(userId, session, updateWBTokenLastUsedTimestampNow)).token;

      if (currentToken === token) {
        return res.sendStatus(409);
      }

      await saveWBTokenToDb(userId, token, session);

      var { listGoods } = await getListGoodsFromDb(userId, session);
      var { listGoodsFromWBAPI } = await listGoodsLoader(userId, token);

      if (!listGoods.length) {
        await saveListGoodsToDb(userId, listGoodsFromWBAPI, session);
      } else {
        var { newSkus } = extractNewSkusFromLIstGoods(listGoodsFromWBAPI, listGoods);
        await saveNewSkusToDb(userId, newSkus, session);
      }

      var tokenData = getTokenDetails(tokenPayload);
      tokenData.lastUsed = new Date(Date.now() + mskTimeOffsetInMs);

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

export default saveToken;
