import { dbClient } from "../../../database/index.js";
import wbapi from "../../reports/services/WBAPI/index.js";
import dbUtils from "../../../database/collections/index.js";
import splitListGoodsByExistence from "../services/splitListGoodsByExistence.js";
import extractRequiredListGoodsData from "../../goods/services/extractRequiredListGoodsData.js";

var updateLastUsedTimestampNow = true;

var updateDataIntoListGoods = async (req, res, next) => {
  var { getWBTokenByUserId } = dbUtils.tokenCollectionServices;
  var { getAllUserListGoodsIds, saveNewSkusToDb, updateSkusFields } = dbUtils.goodsCollectionServices;

  var data = await getAllUserListGoodsIds();

  for (var { userId, listGoodsIds, listGoodsSkuNamesAndIds } of data) {
    var session = await dbClient.startSession();

    try {
      await session.withTransaction(async () => {
        if (listGoodsIds.length) {
          var { token } = await getWBTokenByUserId(userId, session, updateLastUsedTimestampNow);

          var { rawListGoods } = await wbapi.getPricesAndDiscountsByListGoods(userId, token, listGoodsIds);

          var listGoodsFromWBAPI = (await extractRequiredListGoodsData(rawListGoods)).listGoods;
          var { newSkus, updatedSkus } = splitListGoodsByExistence(listGoodsSkuNamesAndIds, listGoodsFromWBAPI);

          if (newSkus.length) {
            await saveNewSkusToDb(userId, newSkus, session);
          }

          await updateSkusFields(userId, updatedSkus, session);
        }
      });
    } catch (e) {
    } finally {
      if (session) {
        await session.endSession();
      }
    }
  }

  return res.sendStatus(200);
};

export default updateDataIntoListGoods;
