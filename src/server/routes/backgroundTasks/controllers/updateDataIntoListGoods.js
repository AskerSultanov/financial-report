import { dbClient } from "../../../database/index.js";
import wbapi from "../../reports/services/WBAPI/index.js";
import dbUtils from "../../../database/collections/index.js";
import checkTokenExpiry from "../../WBToken/services/checkTokenExpiry.js";
import splitListGoodsByExistence from "../services/splitListGoodsByExistence.js";
import extractRequiredListGoodsData from "../../goods/services/extractRequiredListGoodsData.js";
import updateListGoodsMetrics from "../../reports/services/different/updateListGoodsMetrics.js";

var statusOfReportLoadingStop = true;
var projectedFields = ["reports.skus", "reports.recordedTo", "reports.isCrossYearPeriod"];

var { getReportsByUserId } = dbUtils.reportCollectionServices;
var { getWBTokenByUserId, updateWBTokenLastUsedTimestamp } = dbUtils.tokenCollectionServices;
var { updateReportLoadingStoppedStatus } = dbUtils.reportLoadingStatesCollectionServices;
var { getAllUserListGoodsIds, saveNewSkusToDb, updateSkusFields } = dbUtils.goodsCollectionServices;

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
          var tokenIsExpired = checkTokenExpiry(token);

          if (tokenIsExpired) {
            var loadingStopReason = "tokenIsExpired";
            await dbUtils.updateReportLoadingStoppedStatus(userId, statusOfReportLoadingStop, loadingStopReason, session);
          } else {
            if (listGoodsIds.length) {
              await updateWBTokenLastUsedTimestamp(userId, session);

              var { reports } = await getReportsByUserId(userId, session, projectedFields);
              var { rawListGoods } = await wbapi.getPricesAndDiscountsByListGoods(userId, token, listGoodsIds);

              var listGoodsFromWBAPI = (await extractRequiredListGoodsData(rawListGoods)).listGoods;
              var { newSkus, updatedSkus } = splitListGoodsByExistence(listGoodsSkuNamesAndIds, listGoodsFromWBAPI);

              if (newSkus.length) {
                for (var report of reports) {
                  newSkus = updateListGoodsMetrics(report, newSkus).listGoodsWithUpdatedSkuMetrics;
                }

                await saveNewSkusToDb(userId, newSkus, session);
              }

              await updateSkusFields(userId, updatedSkus, session);
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
