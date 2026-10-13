import { randomUUID } from "node:crypto";
import processReportSkus from "../../reports/services/utils/reportParsing/index.js";
import removeDublicateFiles from "../../reports/services/utils/reportsFileParser/removeDublicateFiles.js";
import getReportTargetYearAndMonth from "../../reports/services/utils/different/getReportTargetYearAndMonth.js";
import extractWorkSheetFromFile from "../../reports/services/utils/reportsFileParser/extractWorkSheetFromFile.js";
import extractReportsFileBufferFromZip from "../../reports/services/utils/reportsFileParser/extractReportsFileBufferFromZip.js";
import extractReportDataFromWorkSheets from "../../reports/services/utils/reportsFileParser/extractReportDataFromWorkSheets.js";

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

var getReportFromFilesController = async (req, res) => {
  var { deduplicatedFiles } = removeDublicateFiles(req.files);

  var { weeklyFinancialReportsBuffer, paidStorageReportsBuffer } =
    await extractReportsFileBufferFromZip(deduplicatedFiles);
  var { workSheets } = await extractWorkSheetFromFile(
    weeklyFinancialReportsBuffer,
    paidStorageReportsBuffer,
  );

  if (!workSheets.length) {
    return res.json({ report: {}, reportPeriodIsEmpty: true });
  }

  var { dateFrom, dateTo, onePeriodReports } = workSheets[0];

  var startYear = +dateFrom.split("-")[0];
  var endYear = +dateTo.split("-")[0];
  var isCrossYearPeriod = startYear !== endYear;

  var { targetYear, targetMonthIndex } = getReportTargetYearAndMonth(
    dateFrom,
    dateTo,
  );

  var { reports, reportPeriodIsEmpty } =
    await extractReportDataFromWorkSheets(onePeriodReports);

  if (reportPeriodIsEmpty) {
    return res.json({ reports, reportPeriodIsEmpty });
  }

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
  report.taxRate = taxParamsStub.taxRate;
  report.isCrossYearPeriod = isCrossYearPeriod;
  report.reportId = reports.weeklyFinancialReport[0].reportId;
  report.recordedTo = { year: targetYear, month: monthList[targetMonthIndex] };

  return res.json({ report, reportPeriodIsEmpty });
};

export default getReportFromFilesController;
