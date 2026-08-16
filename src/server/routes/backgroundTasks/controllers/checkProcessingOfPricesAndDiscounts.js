import { dbClient } from "../../../database/index.js";
import wbapi from "../../reports/services/WBAPI/index.js";
import dbUtils from "../../../database/collections/index.js";
import checkTokenExpiry from "../../WBToken/services/checkTokenExpiry.js";

var statusOfReportLoadingStop = true;
var updateLastUsedTimestampNow = true;

var { getWBTokenByUserId } = dbUtils.tokenCollectionServices;
var { setPriceUpdateTimestampAndUpdateStatus } = dbUtils.goodsCollectionServices;
var { updateReportLoadingStoppedStatus } = dbUtils.reportLoadingStatesCollectionServices;
var { getAllUserWeeklyPricesAndDiscounts } = dbUtils.weeklyPricesAndDiscountsCollectionServices;

var checkProcessingOfPricesAndDiscounts = async (req, res, next) => {
  var data = await getAllUserWeeklyPricesAndDiscounts();

  for (var { userId, uploadId } of data) {
    var session = await dbClient.startSession();

    try {
      await session.withTransaction(async () => {
        if (uploadId) {
          var { token } = await getWBTokenByUserId(userId, session, updateLastUsedTimestampNow);

          if (token) {
            var loadingStopReason = "isTokenMissing";
            await updateReportLoadingStoppedStatus(userId, statusOfReportLoadingStop, loadingStopReason, session);
          } else {
            var tokenIsExpired = checkTokenExpiry(token);

            if (tokenIsExpired) {
              var loadingStopReason = "tokenIsExpired";
              await dbUtils.updateReportLoadingStoppedStatus(userId, statusOfReportLoadingStop, loadingStopReason, session);
            } else {
              var { historyGoods } = await wbapi.getPriceUploadDetails(userId, uploadId, token);

              await setPriceUpdateTimestampAndUpdateStatus(userId, historyGoods, session);
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

export default checkProcessingOfPricesAndDiscounts;
