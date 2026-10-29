import loadExcelLibs from "../../loadExcelLibs.js";
import splitSkusByYear from "./utils/splitReportsByYear.js";
import getReportsSummary from "./utils/getReportsSummary.js";
import writeTitlesToSummaryWorkSheet from "./utils/writeTitlesToSummaryWorkSheet.js";
import calcReportTotalsFromSkus from "../calcUtils/utils/calcReportTotalsFromSkus.js";
import writeReportsSummaryToWorkSheet from "./utils/writeReportsSummaryToWorkSheet.js";

var generateReportsSummaryXlsxBuffer = async (reports) => {
  var { ExcelJS } = await loadExcelLibs();

  var workbook = new ExcelJS.Workbook();

  var crossYearPeriodReport = reports.find(
    (report) => report.isCrossYearPeriod,
  );

  var summaryWorkSheet = workbook.addWorksheet("Сводка");

  summaryWorkSheet = await writeTitlesToSummaryWorkSheet(summaryWorkSheet);

  var { summary } = await getReportsSummary(reports);

  await writeReportsSummaryToWorkSheet(summaryWorkSheet, summary);

  if (crossYearPeriodReport) {
    var { dateFrom, dateTo } = crossYearPeriodReport;

    var startYear = +dateFrom.split("-")[0];
    var endYear = +dateTo.split("-")[0];

    var { startYearSkus, endYearSkus } = splitSkusByYear(reports, startYear);

    var startYearSummary = calcReportTotalsFromSkus(startYearSkus).reportTotals;
    var endYearSummary = calcReportTotalsFromSkus(endYearSkus).reportTotals;

    var startYearSummaryWorkSheetName = "Сводка за " + startYear;
    var endYearSummaryWorkSheetName = "Сводка за " + endYear;

    var startYearSummaryWorkSheet = workbook.addWorksheet(
      startYearSummaryWorkSheetName,
    );

    var endYearSummaryWorkSheet = workbook.addWorksheet(
      endYearSummaryWorkSheetName,
    );

    var startPeriod = endYear + "-01-01";
    var endPeriod = startYear + "-12-31";

    startYearSummaryWorkSheet = await writeTitlesToSummaryWorkSheet(
      startYearSummaryWorkSheet,
    );

    endYearSummaryWorkSheet = await writeTitlesToSummaryWorkSheet(
      endYearSummaryWorkSheet,
    );

    startYearSummary = Object.assign(
      {},
      { dateFrom, dateTo: endPeriod, ...startYearSummary },
    );

    endYearSummary = Object.assign(
      {},
      { dateFrom: startPeriod, dateTo, ...endYearSummary },
    );

    await writeReportsSummaryToWorkSheet(
      startYearSummaryWorkSheet,
      startYearSummary,
    );

    await writeReportsSummaryToWorkSheet(
      endYearSummaryWorkSheet,
      endYearSummary,
    );
  }

  var buffer = await workbook.xlsx.writeBuffer();

  return { buffer };
};

export default generateReportsSummaryXlsxBuffer;
