import { dbClient } from "../../../database/index.js";
import wbapi from "../../reports/services/WBAPI/index.js";
import dbUtils from "../../../database/collections/index.js";
import getCurrentDayMSK from "../services/getCurrentDayMSK.js";
import checkTokenExpiry from "../../WBToken/services/checkTokenExpiry.js";

var statusOfReportLoadingStop = true;
var updateLastUsedTimestampNow = true;

var { getWBTokenByUserId } = dbUtils.tokenCollectionServices;
var { updateReportLoadingStoppedStatus } = dbUtils.reportLoadingStatesCollectionServices;
var { getTodayPricesAndDiscountsByDayIndex, setUploadId } = dbUtils.weeklyPricesAndDiscountsCollectionServices;

var uploadToWBAPITodayPricesAndDiscounts = async (req, res, next) => {
  var { currentDayIndex } = getCurrentDayMSK();
  var data = await getTodayPricesAndDiscountsByDayIndex(currentDayIndex);

  for (var { userId, currentDayPricesAndDiscounts } of data) {
    var session = await dbClient.startSession();

    try {
      await session.withTransaction(async () => {
        if (currentDayPricesAndDiscounts) {
          currentDayPricesAndDiscounts = currentDayPricesAndDiscounts.map(({ data }) => data);

          var { token } = await getWBTokenByUserId(userId, session, updateLastUsedTimestampNow);

          if (!token) {
            var loadingStopReason = "isTokenMissing";
            await updateReportLoadingStoppedStatus(userId, statusOfReportLoadingStop, loadingStopReason, session);
          } else {
            var tokenIsExpired = checkTokenExpiry(token);

            if (tokenIsExpired) {
              var loadingStopReason = "tokenIsExpired";
              await dbUtils.updateReportLoadingStoppedStatus(userId, statusOfReportLoadingStop, loadingStopReason, session);
            } else {
              var { id, alreadyExists } = await wbapi.setPricesAndDiscounts(userId, token, currentDayPricesAndDiscounts);

              if (!alreadyExists) {
                await setUploadId(userId, id, session);
              }
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

export default uploadToWBAPITodayPricesAndDiscounts;
