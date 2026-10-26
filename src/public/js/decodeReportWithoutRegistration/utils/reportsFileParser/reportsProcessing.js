import processReportSkus from "../reportParsing/index.js";
import getReportTargetYearAndMonth from "./getReportTargetYearAndMonth.js";

var monthList = [
  "январь",
  "февраль",
  "марта",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабрь",
];

var reportsProcessing = async (dateFrom, dateTo, reports) => {
  var startYear = +dateFrom.split("-")[0];
  var endYear = +dateTo.split("-")[0];
  var isCrossYearPeriod = startYear !== endYear;

  var reportSkus = [];
  var { reportId } = reports.weeklyFinancialReport[0];
  var { targetYear, targetMonthIndex } = getReportTargetYearAndMonth(
    dateFrom,
    dateTo,
  );

  for (var currentYear = startYear; currentYear <= endYear; currentYear++) {
    var { skus } = await processReportSkus(
      reports,
      currentYear,
      isCrossYearPeriod,
    );

    reportSkus.push(...skus);
  }

  if (!reportSkus.length) {
    return { reportPeriodIsEmpty: true, report: {} };
  }

  var report = {};
  report.skus = reportSkus;

  report.dateTo = dateTo;
  report.dateFrom = dateFrom;
  report.reportId = reportId;
  report.isCrossYearPeriod = isCrossYearPeriod;
  report.recordedTo = { year: targetYear, month: monthList[targetMonthIndex] };

  return {
    report,
    reportPeriodIsEmpty: false,
  };
};

export default reportsProcessing;
