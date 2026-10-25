import ExcelJS from "exceljs-community";
import createSkusSheet from "./utils/createSKUsSheet.js";
import createTotalsSheet from "./utils/createTotalsSheet.js";
import setFormulasToTotalsSheet from "./utils/setFormulasToTotalsSheet.js";
import calcReportTotalsFromSkus from "../calcUtils/utils/calcReportTotalsFromSkus.js";

var generateReportXlsxBuffer = async (report) => {
  var { dateFrom, dateTo, skus, isCrossYearPeriod } = report;

  var reportTotals = {};
  reportTotals.dateFrom = dateFrom;
  reportTotals.dateTo = dateTo;

  var restReportTotals = calcReportTotalsFromSkus(skus).reportTotals;

  reportTotals = Object.assign(reportTotals, restReportTotals);

  var workbook = new ExcelJS.Workbook();

  var totalsSheet = workbook.addWorksheet("Сводка");

  var indentToTotalsData = 2;

  totalsSheet = await createTotalsSheet(
    reportTotals,
    totalsSheet,
    indentToTotalsData,
  );

  if (isCrossYearPeriod) {
    var startYear = +dateFrom.split("-")[0];
    var startYearSkus = skus.filter((sku) => sku.year === startYear);

    var startYearSheetOpt = {};

    if (startYearSkus.length) {
      var startYearSheetName = "Товары_" + startYear;
      var startYearSheet = workbook.addWorksheet(startYearSheetName);
      await createSkusSheet(startYearSkus, startYearSheet);

      startYearSheetOpt.sheetName = startYearSheetName;
      startYearSheetOpt.skusQty = startYearSkus.length + 1;
    }

    var endYear = +dateTo.split("-")[0];
    var endYearSkus = skus.filter((sku) => sku.year === endYear);
    var endYearSheetOpt = {};

    if (endYearSkus.length) {
      var endYearSheetName = "Товары_" + endYear;
      var endYearSheet = workbook.addWorksheet(endYearSheetName);
      await createSkusSheet(endYearSkus, endYearSheet);

      endYearSheetOpt.sheetName = endYearSheetName;
      endYearSheetOpt.skusQty = endYearSkus.length + 1;
    }

    if (!startYearSheetOpt?.sheetName) {
      setFormulasToTotalsSheet(totalsSheet, false, endYearSheetOpt);
    } else if (!endYearSheetOpt?.sheetName) {
      setFormulasToTotalsSheet(totalsSheet, false, startYearSheetOpt);
    } else {
      setFormulasToTotalsSheet(
        totalsSheet,
        isCrossYearPeriod,
        startYearSheetOpt,
        endYearSheetOpt,
      );
    }
  } else {
    var year = dateFrom.split("-")[0];
    var sheetName = "Товары_" + year;
    var skusSheet = workbook.addWorksheet(sheetName);

    await createSkusSheet(skus, skusSheet);

    var sheetOpt = {
      sheetName,
      skusQty: skus.length + 1,
    };

    setFormulasToTotalsSheet(totalsSheet, isCrossYearPeriod, sheetOpt);
  }

  var buffer = await workbook.xlsx.writeBuffer();

  return { buffer };
};

export default generateReportXlsxBuffer;
