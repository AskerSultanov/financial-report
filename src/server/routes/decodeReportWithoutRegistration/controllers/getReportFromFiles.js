import { randomBytes } from "node:crypto";
import parseReports from "../../reports/services/reportParsing/index.js";
import removeDublicateFiles from "../../reports/services/reportsFileParser/removeDublicateFiles.js";
import extractWorkSheetFromFile from "../../reports/services/reportsFileParser/extractWorkSheetFromFile.js";
import extractReportsFileBufferFromZip from "../../reports/services/reportsFileParser/extractReportsFileBufferFromZip.js";
import extractReportDataFromWorkSheets from "../../reports/services/reportsFileParser/extractReportDataFromWorkSheets.js";

var taxParamsStub = {
  taxRate: 6,
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

var getReportFromFiles = async (req, res) => {
  var { deduplicatedFiles } = removeDublicateFiles(req.files);

  var { weeklyFinancialReportsBuffer, paidStorageReportsBuffer } = await extractReportsFileBufferFromZip(deduplicatedFiles);
  var { workSheets } = await extractWorkSheetFromFile(weeklyFinancialReportsBuffer, paidStorageReportsBuffer);

  if (!workSheets.length) {
    return res.json({ report: {}, reportPeriodIsEmpty: true });
  }

  var { dateFrom, dateTo, onePeriodReports } = workSheets[0];

  var startYear = +dateFrom.split("-")[0];
  var endYear = +dateTo.split("-")[0];
  var isCrossYearPeriod = startYear !== endYear;

  var userId = randomBytes(15).toString("hex");

  var { reports, reportPeriodIsEmpty } = await extractReportDataFromWorkSheets(userId, onePeriodReports);

  if (reportPeriodIsEmpty) {
    return res.json({ reports, reportPeriodIsEmpty });
  }

  var { reportId } = reports.weeklyFinancialReport[0];

  var report = {};

  report.dateTo = dateTo;
  report.userId = userId;
  report.dateFrom = dateFrom;
  report.reportId = reportId;
  report.isCrossYearPeriod = isCrossYearPeriod;

  if (isCrossYearPeriod) {
    var startYearTaxParamsStub = Object.assign({}, { year: startYear, ...taxParamsStub });
    var endYearTaxParamsStub = Object.assign({}, { year: endYear, ...taxParamsStub });

    var taxParams = { startYearTaxParams: startYearTaxParamsStub, endYearTaxParams: endYearTaxParamsStub };

    var { skus } = await parseReports(reports, taxParams, isCrossYearPeriod);
    report.skus = skus;
  } else {
    var { skus } = await parseReports(reports, { year: startYear, ...taxParamsStub });
    report.skus = skus;
  }

  return res.json({ report, reportPeriodIsEmpty });
};

export default getReportFromFiles;
