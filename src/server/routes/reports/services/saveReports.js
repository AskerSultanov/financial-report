import wbapi from "./utils/WBAPI/index.js";
import { dbClient } from "../../../database/index.js";
import reportsProcessing from "./utils/different/reportsProcessing.js";

var fiveMinInMs = 300_000;
var isReportFromFile = false;
var sessionOptions = { maxTimeMs: fiveMinInMs };

var saveReportsService = async (data) => {
  var { dateTo, dateFrom, userId, wbtoken } = data;

  var session = await dbClient.startSession(sessionOptions);

  return await session.withTransaction(async () => {
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

    return {
      reportData,
      infoText,
      errorText: "",
    };
  });
};

export default saveReportsService;
