import buildReportBlock from "./buildReportBlock.js";
import createReportSelector from "./createReportSelector.js";
import getReportsFromLocalStorage from "./getReportsFromLocalStorage.js";
import downloadReportAsXlsxButtonHandler from "./downloadReportAsXLSXButtonHandler.js";
import { enableDownloadReportAsXLSXButton } from "./toggleDownloadReportAsXlsxButtonVisibility.js";
import insertButtonToDownloadReportsInZip from "./utils/reportFileUploadModalWindow/insertButtonToDownloadReportsInZip.js";

var showReportIfExist = () => {
  try {
    var { reports } = getReportsFromLocalStorage();

    if (!reports.length) {
      return;
    }

    var firstReport = reports[0];
    var restReports = reports.slice(1, reports.length - 1);

    buildReportBlock(firstReport);
    enableDownloadReportAsXLSXButton();
    downloadReportAsXlsxButtonHandler(firstReport);

    if (restReports.length) {
      insertButtonToDownloadReportsInZip();
      createReportSelector(reports);
    }
  } catch {
    return;
  }
};

showReportIfExist();
