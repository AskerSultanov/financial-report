import ExcelJS from "exceljs-community";
import createSkusSheet from "./utils/createSKUsSheet.js";
import splitSkusByYear from "./utils/splitReportsByYear.js";
import getMonthlySummary from "./utils/getMonthlySummary.js";
import createTotalsSheet from "./utils/createTotalsSheet.js";
import getReportDateRange from "./utils/getReportDateRange.js";
import writeTotalsTitleToSheet from "./utils/writeTotalsTitleToSheet.js";
import writeTotalValuesToSheet from "./utils/writeTotalValuesToSheet.js";
import calcReportTotalsFromSkus from "../calcUtils/utils/calcReportTotalsFromSkus.js";

var getReportAsXLSXBuffer = async (report) => {
  var { dateFrom, dateTo, skus } = report;

  var reportTotals = {};
  reportTotals.dateFrom = dateFrom;
  reportTotals.dateTo = dateTo;

  var restReportTotals = calcReportTotalsFromSkus(skus).reportTotals;

  reportTotals = Object.assign(reportTotals, restReportTotals);

  var workbook = new ExcelJS.Workbook();

  var totalsSheet = workbook.addWorksheet("Сводка");

  if (report.isCrossYearPeriod) {
    var startYear = dateFrom.split("-")[0];
    var endYear = dateTo.split("-")[0];

    var startYearSheet = workbook.addWorksheet("Товары " + startYear);
    var endYearSheet = workbook.addWorksheet("Товары " + endYear);

    var startYearSkus = skus.filter((sku) => sku.year === startYear);
    var endYearSkus = skus.filter((sku) => sku.year === endYear);

    await createSkusSheet(startYearSkus, startYearSheet);
    await createSkusSheet(endYearSkus, endYearSheet);
  } else {
    var year = dateFrom.split("-")[0];
    var skusSheet = workbook.addWorksheet("Товары " + year);

    await createSkusSheet(skus, skusSheet);
  }

  var indentToTotalsData = 2;

  totalsSheet = await createTotalsSheet(
    reportTotals,
    totalsSheet,
    indentToTotalsData,
  );

  var buffer = await workbook.xlsx.writeBuffer();

  return { buffer };
};

var getMonthlySummaryAsXLSXBuffer = async (reports) => {
  var workbook = new ExcelJS.Workbook();

  var crossYearPeriodReport = reports.find(
    (report) => report.isCrossYearPeriod,
  );

  var indent = 2;
  var sheet = workbook.addWorksheet("Сводка");

  sheet = await writeTotalsTitleToSheet(sheet, indent);

  var { firstDate, lastDate } = getReportDateRange(reports);

  var { monthlySummary } = await getMonthlySummary(
    reports,
    firstDate,
    lastDate,
  );

  await writeTotalValuesToSheet(sheet, indent, monthlySummary);

  if (crossYearPeriodReport) {
    var { dateFrom, dateTo } = crossYearPeriodReport;
    var startYear = +dateFrom.split("-")[0];
    var endYear = +dateTo.split("-")[0];

    var { startYearSkus, endYearSkus } = splitSkusByYear(reports, startYear);

    var startYearTotals = calcReportTotalsFromSkus(startYearSkus).reportTotals;
    var endYearTotals = calcReportTotalsFromSkus(endYearSkus).reportTotals;

    var startYearSheet = workbook.addWorksheet("Сводка за " + startYear);
    var endYearSheet = workbook.addWorksheet("Сводка за " + endYear);

    var startPeriod = endYear + "-01-01";
    var endPeriod = startYear + "-12-31";

    startYearSheet = await writeTotalsTitleToSheet(startYearSheet, indent);
    endYearSheet = await writeTotalsTitleToSheet(endYearSheet, indent);

    startYearTotals = Object.assign(
      {},
      { dateFrom, dateTo: endPeriod, ...startYearTotals },
    );

    endYearTotals = Object.assign(
      {},
      { dateFrom: startPeriod, dateTo, ...endYearTotals },
    );

    await writeTotalValuesToSheet(startYearSheet, indent, startYearTotals);
    await writeTotalValuesToSheet(endYearSheet, indent, endYearTotals);
  }

  var buffer = await workbook.xlsx.writeBuffer();

  return { buffer };
};

export { getReportAsXLSXBuffer, getMonthlySummaryAsXLSXBuffer };
