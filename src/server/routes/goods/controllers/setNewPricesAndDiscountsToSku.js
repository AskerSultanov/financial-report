import { dbClient } from "../../../database/index.js";
import wbapi from "../../reports/services/WBAPI/index.js";
import dbUtils from "../../../database/collections/index.js";

var updateWBTokenLastUsedTimestampNow = true;

var setNewPricesAndDiscountsToSku = async (req, res, next) => {
  var { updateSingleSku } = dbUtils.goodsCollectionServices;
  var { getWBTokenByUserId } = dbUtils.tokenCollectionServices;
  var { userId, skuDataToUpdate, setNewPriceNow, expectedPriceExists } = req.body;

  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {});
    if (setNewPriceNow) {
      var { token } = await getWBTokenByUserId(userId, session, updateWBTokenLastUsedTimestampNow);
      var data = [{ ...skuDataToUpdate }];

      await updateSingleSku(userId, skuDataToUpdate, session);
      await wbapi.setPricesAndDiscounts(userId, token, data);
    }
  } catch (e) {
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
