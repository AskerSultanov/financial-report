import wbapi from "../services/WBAPI/index.js";
import { dbClient } from "../../../database/index.js";
import reportsProcessing from "../services/different/reportsProcessing.js";

var fiveMinInMs = 300_000;
var isReportFromFile = false;
var sessionOptions = { maxTimeMs: fiveMinInMs };

var saveReportsController = async (req, res) => {
  var { dateTo, dateFrom, userId, wbtoken } = req.body;

  try {
    var session = await dbClient.startSession(sessionOptions);

    await session.withTransaction(async () => {
      var reports = await wbapi.getReports(userId, dateFrom, dateTo, wbtoken);

      var { reportData, reportPeriodIsEmpty } = await reportsProcessing(
        userId,
        dateFrom,
        dateTo,
        session,
        reports,
        isReportFromFile,
      );

      var infoText = "";

      if (reportPeriodIsEmpty) {
        infoText = "Нет данных за отчетный период";
      }

      return res.json({
        reportData,
        infoText,
        errorText: "",
      });
    });
  } catch (e) {
    throw e;
  } finally {
    await session.endSession();
  }
};

export default saveReportsController;
