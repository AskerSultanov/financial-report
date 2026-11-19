import wbapi from "./utils/WBAPI/index.js";
import { dbClient } from "../../../database/index.js";
import getNextMonday from "./utils/different/getNextMonday.js";
import reportsProcessing from "./utils/different/reportsProcessing.js";
import isWeeklyFinancialReportNotYetAvailable from "./utils/different/isWeeklyFinancialReportNotYetAvailable.js";

var fiveMinInMs = 300_000;
var isReportFromFile = false;
var sessionOptions = { maxTimeMs: fiveMinInMs };

var saveReportsService = async (data) => {
  var { dateTo, dateFrom, userId, wbtoken } = data;
  var reports = await wbapi.getReports(userId, dateFrom, dateTo, wbtoken);

  if (!reports.weeklyFinancialReport.length) {
    return {
      infoText: "Нет данных за отчетный период",
      reportData: {},
      errorText: "",
    };
  }

  var { nextMonday } = getNextMonday(dateFrom);
  var currentDate = new Date().toISOString().slice(0, 10);

  var isEqual = nextMonday === currentDate;

  if (isEqual && isWeeklyFinancialReportNotYetAvailable(reports)) {
    return {
      infoText: "Отчет за выбранный период еще не готов.\nПопробуйте позже.",
      reportData: {},
      errorText: "",
    };
  }

  var session = await dbClient.startSession(sessionOptions);

  return await session.withTransaction(async () => {
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
