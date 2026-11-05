import buildReportBlock from "./buildReportBlock.js";
import createReportSelector from "./createReportSelector.js";
import getReportsFromLocalStorage from "./getReportsFromLocalStorage.js";
import insertReportPeriodToTotalsTable from "./insertReportPeriodToTotalsTable.js";
import downloadReportAsXlsxButtonHandler from "./downloadReportAsXLSXButtonHandler.js";
import { enableDownloadReportAsXLSXButton } from "./toggleDownloadReportAsXlsxButtonVisibility.js";
import insertButtonToDownloadReportsInZip from "./utils/reportFileUploadModalWindow/insertButtonToDownloadReportsInZip.js";

var bootstrapReportsFromStorage = () => {
  try {
    var { reports } = getReportsFromLocalStorage();

    if (!reports.length) {
      return;
    }

    var firstReport = reports[0];
    var restReports = reports.slice(1, reports.length);

    buildReportBlock(firstReport);
    enableDownloadReportAsXLSXButton();
    downloadReportAsXlsxButtonHandler(firstReport);

    if (restReports.length) {
      insertButtonToDownloadReportsInZip();
      createReportSelector(reports);
    } else {
      var { dateFrom, dateTo } = firstReport;
      insertReportPeriodToTotalsTable(dateFrom, dateTo);
    }
  } catch (e) {
    console.error(e.message);
    return;
  }
};

export default bootstrapReportsFromStorage;
