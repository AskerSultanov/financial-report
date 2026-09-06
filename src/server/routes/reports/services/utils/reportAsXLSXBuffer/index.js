import ExcelJS from "exceljs";
import createSKUsSheet from "./services/createSKUsSheet.js";
import getMonthlySummary from "./services/getMonthlySummary.js";
import createTotalsSheet from "./services/createTotalsSheet.js";
import writeTotalsTitleToSheet from "./services/writeTotalsTitleToSheet.js";
import writeTotalValuesToSheet from "./services/writeTotalValuesToSheet.js";
import calcReportTotalsFromSkus from "../calcServices/utils/calcReportTotalsFromSkus.js";

var getReportAsXLSXBuffer = async (report) => {
  var { dateFrom, dateTo, reportId, skus } = report;

  var reportTotals = {};
  reportTotals.dateFrom = dateFrom;
  reportTotals.dateTo = dateTo;
  reportTotals.reportId = reportId;

  var restReportTotals = calcReportTotalsFromSkus(skus).reportTotals;
  reportTotals = Object.assign(reportTotals, restReportTotals);

  var workbook = new ExcelJS.Workbook();

  var skusSheet = workbook.addWorksheet("Товары");
  var totalsSheet = workbook.addWorksheet("Сводка");

  var indentToTotalsData = skus.length + 2;

  skusSheet = await createSKUsSheet(skus, skusSheet);
  totalsSheet = await createTotalsSheet(reportTotals, totalsSheet, indentToTotalsData);

  var buffer = await workbook.xlsx.writeBuffer();

  return { buffer };
};

var getMonthlySummaryAsXLSXBuffer = async (reports) => {
  var workbook = new ExcelJS.Workbook();

  var sheet = workbook.addWorksheet("Лист 1");

  var indent = 2;

  sheet = await writeTotalsTitleToSheet(sheet, indent);

  var monthlySummary = await getMonthlySummary(reports);

  sheet = await writeTotalValuesToSheet(sheet, indent, monthlySummary);

  var isCrossYearPeriodReport = reports.filter((report) => report.isCrossYearPeriod);

  if (isCrossYearPeriodReport.length) {
    var startYear = isCrossYearPeriodReport[0].dateFrom.split("-")[0];
    var currentYearSheet = workbook.addWorksheet("Сводка за " + startYear);
    var currentYearMonthlySummary = await getMonthlySummary(isCrossYearPeriodReport);
    currentYearSheet = await writeTotalsTitleToSheet(currentYearSheet, indent);
    currentYearSheet = await writeTotalValuesToSheet(currentYearSheet, indent, currentYearMonthlySummary);

    var endYear = isCrossYearPeriodReport[0].dateTo.split("-")[0];
    var nextYearSheet = workbook.addWorksheet("Сводка за " + endYear);
    var nextYearMonthlySummary = await getMonthlySummary(isCrossYearPeriodReport);
    nextYearSheet = await writeTotalsTitleToSheet(nextYearSheet, indent);
    nextYearSheet = await writeTotalValuesToSheet(nextYearSheet, indent, nextYearMonthlySummary);
  }

  var buffer = await workbook.xlsx.writeBuffer();

  return { buffer };
};

export { getReportAsXLSXBuffer, getMonthlySummaryAsXLSXBuffer };
