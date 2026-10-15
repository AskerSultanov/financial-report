import wrapInputElementsIntoDatepicker from "./wrapInputElementsIntoDatepicker.js";
import { disableDownloadReportAsXLSXButton } from "./downloadReportAsXLSXButton.js";

var tablesContainer = document.getElementById("tables-container");

var downloadReportXlxsButton = document.getElementById(
  "download-report-as-xlsx-button",
);

var decodeReportWithoutRegistrationButton = document.getElementById(
  "decode-report-without-registration-button",
);

var newTextContentToDecodeReportWithoutRegistrationButton =
  "Расшифровка отчета без регистрации";

var decodeReportWithoutRegistrationButtonHandler = () => {
  decodeReportWithoutRegistrationButton.onclick = () => {
    wrapInputElementsIntoDatepicker();

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
        decodeReportWithoutRegistrationButton.textContent =
          newTextContentToDecodeReportWithoutRegistrationButton;

        disableDownloadReportAsXLSXButton();

        document
          .querySelectorAll(
            'table[id^="skus-table-"], table[id^="totals-table-"]',
          )
          .forEach((table) => table.remove());

        window["dialog"].show();
      }
    } else {
      window["dialog"].show();
    }
  };
};

decodeReportWithoutRegistrationButtonHandler();
