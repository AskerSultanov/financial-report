import { randomBytes } from "node:crypto";
import wbapi from "../../reports/services/WBAPI/index.js";
import processReportSkus from "../../reports/services/reportParsing/index.js";

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

var getReportFromWBAPI = async (req, res, next) => {
  var { dateFrom, dateTo, token, taxRate } = req.body;

  var startYear = +dateFrom.split("-")[0];
  var endYear = +dateTo.split("-")[0];
  var isCrossYearPeriod = startYear !== endYear;

  var reports = await wbapi.getReports("decode-without-auth", dateFrom, dateTo, token);

  var reportSkus = [];

  for (var currentYear = startYear; currentYear <= endYear; currentYear++) {
    var { skus } = await processReportSkus(reports, { year: currentYear, ...taxParamsStub, taxRate }, isCrossYearPeriod);
    reportSkus.push(...skus);
  }

  var report = {};

  report.dateTo = dateTo;
  report.dateFrom = dateFrom;
  report.taxRate = taxRate;
  report.skus = reportSkus;
  report.isCrossYearPeriod = isCrossYearPeriod;
  report.userId = randomBytes(15).toString("hex");
  report.reportId = reports.weeklyFinancialReport[0];

  return res.json({ report });
};

export default getReportFromWBAPI;
