import splitReport from "./splitReport.js";
import createSkusTable from "./createSkusTable.js";
import { enableActionBar } from "./toggleActionBar.js";
import createTotalsTable from "./createTotalsTable.js";
import switchToFirstTable from "./switchToFirstTable.js";
import enableTablesSwitcher from "./enableTablesSwitcher.js";
import tablesSwitcherHandler from "./tablesSwitcherHandler.js";
import downloadReportAsXlsxButtonHandler from "./downloadReportAsXLSXButtonHandler.js";
import calcReportTotalsFromSkus from "./utils/calcUtils/utils/calcReportTotalsFromSkus.js";
import { enableDownloadReportAsXLSXButton } from "./toggleDownloadReportAsXlsxButtonVisibility.js";

var textContentToDecodeButton = "Получить новый отчёт";
var decodeReportButton = document.getElementById("decode-report-button");

var buildReportBlock = (report) => {
  decodeReportButton.textContent = textContentToDecodeButton;

  var tablesContainer = document.getElementById("tables-container");
  tablesContainer.innerHTML = "";

  enableDownloadReportAsXLSXButton();
  downloadReportAsXlsxButtonHandler(report);

  var { dateFrom, dateTo, skus, reportId, isCrossYearPeriod } = report;

  var startYear = +dateFrom.split("-")[0];
  var endYear = +dateTo.split("-")[0];

  var { reportTotals } = calcReportTotalsFromSkus(skus);

  if (isCrossYearPeriod) {
    var { splitedReport } = splitReport(report);

    var hasSinglePeriodData = splitedReport.length === 1;

    if (!hasSinglePeriodData) {
      createTotalsTable(reportTotals); //parent totals table

      enableTablesSwitcher(dateFrom, dateTo);

      for (var { year, reportPart } of splitedReport) {
        var { reportTotals } = calcReportTotalsFromSkus(reportPart);

        createTotalsTable(reportTotals, year); //child totals table
        createSkusTable(reportPart, reportId, isCrossYearPeriod);
      }

      switchToFirstTable(startYear);
      tablesSwitcherHandler(startYear, endYear);

      return;
    }

    isCrossYearPeriod = false;
    report.isCrossYearPeriod = false;
  }

  createTotalsTable(reportTotals);

  createSkusTable(skus, reportId, report.isCrossYearPeriod);
  enableActionBar(startYear);

  if (isCrossYearPeriod) {
    window.scrollTo({ top: 500, behavior: "smooth" });
  } else {
    window.scrollTo({ top: 900, behavior: "smooth" });
  }
};

export default buildReportBlock;
