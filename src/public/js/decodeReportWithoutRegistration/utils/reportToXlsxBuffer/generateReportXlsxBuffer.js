import loadExcelLibs from "../../loadExcelLibs.js";
import createSkusWorkSheet from "./utils/createSkusWorkSheet.js";
import createSummaryWorkSheet from "./utils/createSummaryWorkSheet.js";
import setDefaultTaxRateToSkusWorkSheet from "./utils/setDefaultTaxRateToSkusWorkSheet.js";
import {
  setFormulasToSummaryWorkSheet,
  setFormulasToParentSummaryWorkSheet,
} from "./utils/setFormulasToSummaryWorkSheet.js";

var summaryWorkSheetName = "Сводка";

var generateReportXlsxBuffer = async (report) => {
  var { ExcelJS } = await loadExcelLibs();

  var { dateFrom, dateTo, skus, isCrossYearPeriod } = report;

  var workbook = new ExcelJS.Workbook();

  var summaryWorkSheet = workbook.addWorksheet(summaryWorkSheetName);

  createSummaryWorkSheet(summaryWorkSheet, dateFrom, dateTo);

  if (isCrossYearPeriod) {
    var childSummaryWorkSheetsName = [];

    var startYear = +dateFrom.split("-")[0];
    var startYearSkus = skus.filter((sku) => sku.year === startYear);

    if (startYearSkus.length) {
      var startYearSummaryWorkSheetName = "Сводка " + startYear;

      childSummaryWorkSheetsName.push(startYearSummaryWorkSheetName);

      var startYearSummaryWorkSheet = workbook.addWorksheet(
        startYearSummaryWorkSheetName,
      );

      var periodEnd = startYear + "-12-31";

      createSummaryWorkSheet(startYearSummaryWorkSheet, dateFrom, periodEnd);

      var startYearSkusWorkSheetName = "Товары " + startYear;
      var startYearSheet = workbook.addWorksheet(startYearSkusWorkSheetName);

      createSkusWorkSheet(startYearSkus, startYearSheet);

      setDefaultTaxRateToSkusWorkSheet(startYearSheet);

      setFormulasToSummaryWorkSheet(
        startYearSummaryWorkSheet,
        startYearSkusWorkSheetName,
        startYearSkus.length,
      );
    }

    var endYear = +dateTo.split("-")[0];
    var endYearSkus = skus.filter((sku) => sku.year === endYear);

    if (endYearSkus.length) {
      var endYearSummaryWorkSheetName = "Сводка " + endYear;
      childSummaryWorkSheetsName.push(endYearSummaryWorkSheetName);

      var endYearTotalsSheet = workbook.addWorksheet(
        endYearSummaryWorkSheetName,
      );

      var periodStart = endYear + "-01-01";
      createSummaryWorkSheet(endYearTotalsSheet, periodStart, dateTo);

      var endYearSkusWorkSheetName = "Товары " + endYear;
      var endYearSheet = workbook.addWorksheet(endYearSkusWorkSheetName);

      createSkusWorkSheet(endYearSkus, endYearSheet);

      setDefaultTaxRateToSkusWorkSheet(endYearSheet);

      setFormulasToSummaryWorkSheet(
        endYearTotalsSheet,
        endYearSkusWorkSheetName,
        endYearSkus.length,
      );
    }

    setFormulasToParentSummaryWorkSheet(
      summaryWorkSheet,
      childSummaryWorkSheetsName,
    );
  } else {
    var year = dateFrom.split("-")[0];
    var skusWorkSheetName = "Товары " + year;
    var skusSheet = workbook.addWorksheet(skusWorkSheetName);

    createSkusWorkSheet(skus, skusSheet);

    setDefaultTaxRateToSkusWorkSheet(skusSheet);

    setFormulasToSummaryWorkSheet(
      summaryWorkSheet,
      skusWorkSheetName,
      skus.length,
    );
  }

  var buffer = await workbook.xlsx.writeBuffer();

  return { buffer };
};

export default generateReportXlsxBuffer;
