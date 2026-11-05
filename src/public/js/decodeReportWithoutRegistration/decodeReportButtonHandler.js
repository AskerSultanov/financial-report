import createUploadModal from "./utils/reportFileUploadModalWindow/createUploadModal.js";
import { disableDownloadReportAsXLSXButton } from "./toggleDownloadReportAsXlsxButtonVisibility.js";

var decodeReportButton = document.getElementById("decode-report-button");

var textContentToDecodeReportButton = "Расшифровка отчета без регистрации";

var decodeReportButtonHandler = () => {
  decodeReportButton.onclick = () => {
    var tablesContainers = document.getElementById("tables-container");

    if (tablesContainers.childNodes.length) {
      var confirmed = confirm(
        "Получение новых отчетов привёдет к потере текущих.\nПродолжить?",
      );

      if (confirmed) {
        localStorage.clear();
        removeReportSelector();
        removeReportsSummaryLabels();
        removeDownloadReportsInZipButton();
        disableDownloadReportAsXLSXButton();
        removeTablesContainerContent(tablesContainers);

        decodeReportButton.textContent = textContentToDecodeReportButton;

        createUploadModal();
      }
    } else {
      createUploadModal();
    }
  };
};

export default decodeReportButtonHandler;

function removeTablesContainerContent(tablesContainers) {
  tablesContainers.innetHTML = "";
}

function removeReportSelector() {
  var selectorContainer = document.getElementById("selector-container");
  selectorContainer?.remove();
}

function removeReportsSummaryLabels() {
  var labels = document.querySelectorAll(".report-summary-label-wrapper");
  labels.forEach((label) => label.remove());
}

function removeDownloadReportsInZipButton() {
  var button = document.getElementById("download-reports-in-zip");
  button?.remove();
}
