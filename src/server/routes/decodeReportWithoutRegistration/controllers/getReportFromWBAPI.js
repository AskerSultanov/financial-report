import { randomUUID } from "node:crypto";
import wbapi from "../../reports/services/utils/WBAPI/index.js";
import processReportSkus from "../../reports/services/utils/reportParsing/index.js";
import getReportTargetYearAndMonth from "../../reports/services/utils/different/getReportTargetYearAndMonth.js";

var taxParamsStub = {
  finalProfit: 0,
  retailAmount: 0,
  paidTaxAmount: 0,
  paidInsuranceFee: 0,
  excessInsuranceRate: 1,
  maxInsuranceFee: 300000,
  mandatoryInsuranceFee: 0,
  isInsuranceFeePaid: false,
  additionalInsuranceFee: 0,
  insuranceFeePercentage: 10,
  mandatoryInsuranceFeeRate: 10,
  hasExcessIncomeForInsurance: false,
  mandatoryInsuranceFeeIsPaid: false,
  additionalInsuranceFeeIsPaid: false,
  requiresAdditionalInsuranceFee: false,
  excessIncomeForAdditionalInsuranceFee: 300000,
};

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

var getReportFromWBAPIController = async (req, res, next) => {
  var { dateFrom, dateTo, token } = req.body;

  var startYear = +dateFrom.split("-")[0];
  var endYear = +dateTo.split("-")[0];
  var isCrossYearPeriod = startYear !== endYear;

  var { targetYear, targetMonthIndex } = getReportTargetYearAndMonth(
    dateFrom,
    dateTo,
  );

  var reports = await wbapi.getReports(
    "decode-without-auth",
    dateFrom,
    dateTo,
    token,
  );

  var reportSkus = [];

  for (var currentYear = startYear; currentYear <= endYear; currentYear++) {
    var { skus } = await processReportSkus(
      reports,
      { year: currentYear, ...taxParamsStub },
      isCrossYearPeriod,
    );
    reportSkus.push(...skus);
  }

  var report = {};

  report.dateTo = dateTo;
  report.skus = reportSkus;
  report.dateFrom = dateFrom;
  report.userId = randomUUID();
  report.isCrossYearPeriod = isCrossYearPeriod;
  report.reportId = reports.weeklyFinancialReport[0].reportId;
  report.recordedTo = { year: targetYear, month: monthList[targetMonthIndex] };

  return res.json({ report, errorText: "" });
};

export default getReportFromWBAPIController;
