import { dbClient } from "../../../database/index.js";
import wbapi from "../../reports/services/WBAPI/index.js";
import dbUtils from "../../../database/collections/index.js";

var updateWBTokenLastUsedTimestampNow = true;

var { getWBTokenByUserId } = dbUtils.tokenCollectionServices;
var { updateSkuInListGoods } = dbUtils.goodsCollectionServices;

var setNewPricesAndDiscountsToSku = async (req, res, next) => {
  var { userId, skuName, skuDataToUpdate, setNewPriceNow, expectedPriceExists } = req.body;
  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {});
    if (setNewPriceNow) {
      var { token } = await getWBTokenByUserId(userId, session, updateWBTokenLastUsedTimestampNow);

      var data = [skuDataToUpdate];
      await wbapi.setPricesAndDiscounts(userId, token, data);

      await updateSkuInListGoods(userId, skuName, { price: skuDataToUpdate.data.price, discount: skuDataToUpdate.data.discount }, session);
    }
  } catch (e) {
    console.log(e);
    return res.sendStatus(304);
  } finally {
    if (session) {
      await session.endSession();
    }
  }

  if (!expectedPriceExists) {
    return res.sendStatus(200);
  }

  next();
};

export default setNewPricesAndDiscountsToSku;
