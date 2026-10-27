import createSkusSheet from "./utils/createSKUsSheet.js";
import createTotalsSheet from "./utils/createTotalsSheet.js";
import calcReportTotalsFromSkus from "../calcUtils/utils/calcReportTotalsFromSkus.js";
import {
  setFormulasToTotalsSheet,
  setFormulasToParentTotalsSheet,
} from "./utils/setFormulasToTotalsSheet.js";

var totalsSheetName = "Сводка";

var generateReportXlsxBuffer = async (report) => {
  var { dateFrom, dateTo, skus, isCrossYearPeriod } = report;

  var reportTotals = {};
  reportTotals.dateFrom = dateFrom;
  reportTotals.dateTo = dateTo;

  var restReportTotals = calcReportTotalsFromSkus(skus).reportTotals;

  reportTotals = Object.assign(reportTotals, restReportTotals);
  
  var workbook = new ExcelJS.Workbook();

  var totalsSheet = workbook.addWorksheet(totalsSheetName);

  var indentToTotalsData = 2;

  totalsSheet = await createTotalsSheet(
    reportTotals,
    totalsSheet,
    indentToTotalsData,
  );

  if (isCrossYearPeriod) {
    var childTotalSheetsName = [];
    var startYear = +dateFrom.split("-")[0];
    var startYearSkus = skus.filter((sku) => sku.year === startYear);

    if (startYearSkus.length) {
      var startYearTotalsSheetName = "Сводка " + startYear;

      childTotalSheetsName.push(startYearTotalsSheetName);

      var startYearTotalsSheet = workbook.addWorksheet(
        startYearTotalsSheetName,
      );

      var startYearTotals =
        calcReportTotalsFromSkus(startYearSkus).reportTotals;

      startYearTotals = Object.assign(reportTotals, startYearTotals);

      startYearTotalsSheet = await createTotalsSheet(
        startYearTotals,
        startYearTotalsSheet,
        indentToTotalsData,
      );

      var startYearSkusSheetName = "Товары " + startYear;
      var startYearSheet = workbook.addWorksheet(startYearSkusSheetName);

      await createSkusSheet(startYearSkus, startYearSheet);

      setFormulasToTotalsSheet(
        startYearTotalsSheet,
        startYearSkusSheetName,
        startYearSkus.length + 1,
      );
    }

    var endYear = +dateTo.split("-")[0];
    var endYearSkus = skus.filter((sku) => sku.year === endYear);

    if (endYearSkus.length) {
      var endYearTotalsSheetName = "Сводка " + endYear;
      childTotalSheetsName.push(endYearTotalsSheetName);

      var endYearTotalsSheet = workbook.addWorksheet(endYearTotalsSheetName);

      var endYearTotals = calcReportTotalsFromSkus(endYearSkus).reportTotals;

      endYearTotals = Object.assign(reportTotals, endYearTotals);

      endYearTotalsSheet = await createTotalsSheet(
        endYearTotals,
        endYearTotalsSheet,
        indentToTotalsData,
      );

      var endYearSkusSheetName = "Товары " + endYear;
      var endYearSheet = workbook.addWorksheet(endYearSkusSheetName);

      await createSkusSheet(endYearSkus, endYearSheet);

      setFormulasToTotalsSheet(
        endYearTotalsSheet,
        endYearSkusSheetName,
        endYearSkus.length + 1,
      );
    }

    setFormulasToParentTotalsSheet(totalsSheet, childTotalSheetsName);
  } else {
    var year = dateFrom.split("-")[0];
    var sheetName = "Товары " + year;
    var skusSheet = workbook.addWorksheet(sheetName);

    await createSkusSheet(skus, skusSheet);

    setFormulasToTotalsSheet(totalsSheet, sheetName, skus.length + 1);
  }

  var buffer = await workbook.xlsx.writeBuffer();

  return { buffer };
};

export default generateReportXlsxBuffer;
