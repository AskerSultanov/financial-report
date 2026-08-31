import { dbClient } from "../../../database/index.js";
import parseJwt from "../../WBToken/services/parseJwt.js";
import wbapi from "../../reports/services/WBAPI/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import checkTokenExpiry from "../../WBToken/services/checkTokenExpiry.js";
import splitListGoodsByExistence from "../services/splitListGoodsByExistence.js";
import extractRequiredListGoodsData from "../../goods/services/extractRequiredListGoodsData.js";

var statusOfReportLoadingStop = true;

var { updateReportLoadingStoppedStatus } = dbUtils.reportLoadingStateModelUtils;
var { getWBTokenByUserId, updateWBTokenLastUsedTimestamp } = dbUtils.tokenModelUtils;
var { getAllUserListGoodsIds, saveNewSkusToDb, updateSkusInListGoods } = dbUtils.goodsModelUtils;

var updateDataIntoListGoods = async (req, res, next) => {
  var data = await getAllUserListGoodsIds();

  for (var { userId, listGoodsIds, listGoodsSkuNamesAndIds } of data) {
    var session = await dbClient.startSession();

    try {
      await session.withTransaction(async () => {
        var { token } = await getWBTokenByUserId(userId, session);

        if (!token) {
          var loadingStopReason = "isTokenMissing";
          await updateReportLoadingStoppedStatus(userId, statusOfReportLoadingStop, loadingStopReason, session);
        } else {
          var tokenPayload = parseJwt(token);
          var { isExpired } = checkTokenExpiry(tokenPayload);

          if (isExpired) {
            var loadingStopReason = "tokenIsExpired";
            await dbUtils.updateReportLoadingStoppedStatus(userId, statusOfReportLoadingStop, loadingStopReason, session);
          } else {
            if (listGoodsIds.length) {
              await updateWBTokenLastUsedTimestamp(userId, session);

              var { rawListGoods } = await wbapi.getPricesAndDiscountsByListGoods(userId, token, listGoodsIds);

              var listGoodsFromWBAPI = (await extractRequiredListGoodsData(rawListGoods)).listGoods;
              var { newSkus, updatedSkus } = splitListGoodsByExistence(listGoodsSkuNamesAndIds, listGoodsFromWBAPI);

              if (newSkus.length) {
                await saveNewSkusToDb(userId, newSkus, session);
              }

              await updateSkusInListGoods(userId, updatedSkus, session);
            }
          }
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
