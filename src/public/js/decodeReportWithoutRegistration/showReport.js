import splitReport from "./splitReport.js";
import createSkusTable from "./createSkusTable.js";
import createTotalsTable from "./createTotalsTable.js";
import switchToFirstTable from "./switchToFirstTable.js";
import getReportPeriodText from "./getReportPeriodText.js";
import enableTablesSwitcher from "./enableTablesSwitcher.js";
import tablesSwitcherHandler from "./tablesSwitcherHandler.js";
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
    var { splitedReport } = splitReport(report);

    var hasSinglePeriodData = splitedReport.length === 1;

    if (!hasSinglePeriodData) {
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

      enableTablesSwitcher([startYear, endYear]);

      var isFirstIteration = true;

      for (var { year, reportPart } of splitedReport) {
        var { reportTotals } = calcReportTotalsFromSkus(reportPart);

        var targetPeriod;

        if (isFirstIteration) {
          targetPeriod = dateFrom;

          isFirstIteration = false;
        } else {
          targetPeriod = dateTo;
        }

        var { reportPeriodText } = getReportPeriodText(
          dateFrom,
          dateTo,
          targetPeriod,
        );

        createTotalsTable(
          reportTotals,
          year,
          isCrossYearPeriod,
          reportPeriodText,
        );

        createSkusTable(report, reportPart);
      }

      switchToFirstTable(startYear);
      tablesSwitcherHandler(startYear, endYear);
      return;
    }

    isCrossYearPeriod = false;
    report.isCrossYearPeriod = false;
  }

  createTotalsTable(
    reportTotals,
    yearValueStub,
    isCrossYearPeriod,
    reportSummaryLabelTextStub,
  );

  createSkusTable(report, skus);

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
