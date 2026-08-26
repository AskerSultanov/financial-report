import { dbClient } from "../../../database/index.js";
import parseJwt from '../../WBToken/services/parseJwt.js'
import wbapi from "../../reports/services/WBAPI/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import checkTokenExpiry from "../../WBToken/services/checkTokenExpiry.js";

var statusOfReportLoadingStop = true;
var updateWBTokenLastUsedTimestampNow = true;

var { getWBTokenByUserId } = dbUtils.tokenModelUtils;
var { updateSkuInListGoods } = dbUtils.goodsModelUtils;
var { updateReportLoadingStoppedStatus } = dbUtils.reportLoadingStateModelUtils;

var setNewPricesAndDiscountsToSku = async (req, res, next) => {
  var { userId, skuName, skuDataToUpdate, setNewPriceNow, expectedPriceExists } = req.body;
  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {});
    if (setNewPriceNow) {
      var { token } = await getWBTokenByUserId(userId, session, updateWBTokenLastUsedTimestampNow);

      if (!token) {
        var loadingStopReason = "isTokenMissing";
        await updateReportLoadingStoppedStatus(userId, statusOfReportLoadingStop, loadingStopReason, session);
        return res.status(401).json({ msg: "Отсутствует токен личного кабинета WB" });
      }

      var tokenPayload = parseJwt(token)
      var tokenIsExpired = checkTokenExpiry(tokenPayload);

      if (tokenIsExpired) {
        var loadingStopReason = "tokenIsExpired";
        await dbUtils.updateReportLoadingStoppedStatus(userId, statusOfReportLoadingStop, loadingStopReason, session);
        return res.status(401).json({ msg: "Токен личного кабинета WB просрочен" });
      }

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
