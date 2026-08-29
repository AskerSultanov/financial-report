import wbapi from "../services/WBAPI/index.js";
import { dbClient } from "../../../database/index.js";
import parseJwt from "../../WBToken/services/parseJwt.js";
import { WBAPIError } from "../../../customError/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import checkTokenExpiry from "../../WBToken/services/checkTokenExpiry.js";
import reportsProcessing from "../services/different/reportsProcessing.js";

var fiveMinInMs = 300_000;
var isReportFromFile = false;
var invalidTokenErrorMsg = "Invalid Token";
var updateWBTokenLastUsedTimestampNow = true;
var sessionOptions = { maxTimeMs: fiveMinInMs };

var { getWBTokenByUserId } = dbUtils.tokenModelUtils;

var saveReports = async (req, res) => {
  var { dateTo, dateFrom, userId } = req.body;

  try {
    var session = await dbClient.startSession(sessionOptions);

    await session.withTransaction(async () => {
      var { token } = await getWBTokenByUserId(userId, session, updateWBTokenLastUsedTimestampNow);

      var tokenPayload = parseJwt(token);
      var tokenIsExpired = checkTokenExpiry(tokenPayload);

      if (tokenIsExpired) {
        throw new WBAPIError(userId, 401, invalidTokenErrorMsg);
      }

      var reports = await wbapi.getReports(userId, dateFrom, dateTo, token);
      var { reportData, reportPeriodIsEmpty } = await reportsProcessing(userId, dateFrom, dateTo, session, reports, isReportFromFile);

      return reportPeriodIsEmpty ? res.sendStatus(204) : res.json({ reportData });
    });
  } catch (e) {
    throw e;
  } finally {
    await session.endSession();
  }
};

export default saveReports;
