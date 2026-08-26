import { dbClient } from "../../../database/index.js";
import parseJwt from '../../WBToken/services/parseJwt.js'
import wbapi from "../../reports/services/WBAPI/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import getCurrentDayMSK from "../services/getCurrentDayMSK.js";
import checkTokenExpiry from "../../WBToken/services/checkTokenExpiry.js";

var statusOfReportLoadingStop = true;

var { updateReportLoadingStoppedStatus } = dbUtils.reportLoadingStateModelUtils;
var { getWBTokenByUserId, updateWBTokenLastUsedTimestamp } = dbUtils.tokenModelUtils;
var { getTodayPricesAndDiscountsByDayIndex, setUploadId } = dbUtils.weeklyPricesAndDiscountsModelUtils;

var uploadToWBAPITodayPricesAndDiscounts = async (req, res, next) => {
  var { currentDayIndex } = getCurrentDayMSK();
  var data = await getTodayPricesAndDiscountsByDayIndex(currentDayIndex);

  for (var { userId, currentDayPricesAndDiscounts } of data) {
    var session = await dbClient.startSession();

    try {
      await session.withTransaction(async () => {
        if (currentDayPricesAndDiscounts) {
          currentDayPricesAndDiscounts = currentDayPricesAndDiscounts.map(({ data }) => data);

          var { token } = await getWBTokenByUserId(userId, session);

          if (!token) {
            var loadingStopReason = "isTokenMissing";
            await updateReportLoadingStoppedStatus(userId, statusOfReportLoadingStop, loadingStopReason, session);
          } else {
            var tokenPayload = parseJwt(token)
            var tokenIsExpired = checkTokenExpiry(tokenPayload);

            if (tokenIsExpired) {
              var loadingStopReason = "tokenIsExpired";
              await dbUtils.updateReportLoadingStoppedStatus(userId, statusOfReportLoadingStop, loadingStopReason, session);
            } else {
              await updateWBTokenLastUsedTimestamp(userId, session);

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
