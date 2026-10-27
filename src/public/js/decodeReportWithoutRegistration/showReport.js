import createSkusTable from "./createSkusTable.js";
import createTotalsTable from "./createTotalsTable.js";
import getReportPeriodText from "./getReportPeriodText.js";
import downloadReportAsXlsxuttonHandler from "./downloadReportAsXLSXButtonHandler.js";
import calcReportTotalsFromSkus from "./utils/calcUtils/utils/calcReportTotalsFromSkus.js";
import { enableDownloadReportAsXLSXButton } from "./toggleDownloadReportAsXlsxButtonVisibility.js";

var yearValueStub = "";
var reportSummaryLabelTextStub = "";

var textContentToDecodeButton = "Получить новый отчёт";

var decodeReportButton = document.getElementById("decode-report-button");

var showReport = async (report) => {
  var { dateFrom, dateTo, isCrossYearPeriod, skus, reportId } = report;

  var startYear = +report.dateFrom.split("-")[0];
  var endYear = +report.dateTo.split("-")[0];

  var { reportTotals } = calcReportTotalsFromSkus(skus);

  if (isCrossYearPeriod) {
    var startYearSkus = skus.filter((sku) => sku.year === startYear);
    var endYearSkus = skus.filter((sku) => sku.year === endYear);

    var fullReportPeriodText = getReportPeriodText(
      dateFrom,
      dateTo,
    ).reportPeriodText;

    createTotalsTable(
      reportTotals,
      yearValueStub,
      isCrossYearPeriod,
      fullReportPeriodText,
    );

    var startYearReportTotals =
      calcReportTotalsFromSkus(startYearSkus).reportTotals;
    var startReportPeriodText = getReportPeriodText(
      dateFrom,
      dateTo,
      dateFrom,
    ).reportPeriodText;

    createTotalsTable(
      startYearReportTotals,
      startYear,
      isCrossYearPeriod,
      startReportPeriodText,
    );
    createSkusTable(report, startYearSkus, startYear);

    var endYearReportTotals =
      calcReportTotalsFromSkus(endYearSkus).reportTotals;
    var endReportPeriodText = getReportPeriodText(
      dateFrom,
      dateTo,
      dateTo,
    ).reportPeriodText;

    createTotalsTable(
      endYearReportTotals,
      endYear,
      isCrossYearPeriod,
      endReportPeriodText,
    );
    createSkusTable(report, endYearSkus, endYear);
  } else {
    createTotalsTable(
      reportTotals,
      yearValueStub,
      isCrossYearPeriod,
      reportSummaryLabelTextStub,
    );
    createSkusTable(report, skus, startYear);
  }

  enableDownloadReportAsXLSXButton();
  downloadReportAsXlsxuttonHandler(reportId);

  if (isCrossYearPeriod) {
    window.scrollTo({ top: 500, behavior: "smooth" });
  } else {
    window.scrollTo({ top: 900, behavior: "smooth" });
  }

  decodeReportButton.textContent = textContentToDecodeButton;
};

export default showReport;
