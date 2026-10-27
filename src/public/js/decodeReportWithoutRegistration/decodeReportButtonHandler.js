import wrapInputElementsIntoDatepicker from "./wrapInputElementsIntoDatepicker.js";
import createUploadModal from "./utils/reportFileUploadModalWindow/createUploadModal.js";
import { disableDownloadReportAsXLSXButton } from "./toggleDownloadReportAsXlsxButtonVisibility.js";

var tablesContainer = document.getElementById("tables-container");

var decodeReportButton = document.getElementById("decode-report-button");

var textContentToDecodeReportButton = "Расшифровка отчета без регистрации";

var decodeReportButtonHandler = () => {
  decodeReportButton.onclick = () => {
    createUploadModal();
    // wrapInputElementsIntoDatepicker();

    var reportSummaryLabels = document.querySelectorAll(
      ".report-summary-label-wrapper",
    );

    if (tablesContainer.childNodes.length) {
      var confirmed = confirm(
        "Получение нового отчета привёдет к потере текущего.\nПродолжить?",
      );

      if (confirmed) {
        localStorage.clear();
        tablesContainer.innerHTML = "";
        reportSummaryLabels.forEach((label) => label.remove());
        decodeReportButton.textContent = textContentToDecodeReportButton;

        disableDownloadReportAsXLSXButton();

        document
          .querySelectorAll(
            'table[id^="skus-table-"], table[id^="totals-table-"]',
          )
          .forEach((table) => table.remove());

        // window["dialog"].show();
      }
    } else {
      // window["dialog"].show();
    }
  };
};

decodeReportButtonHandler();
