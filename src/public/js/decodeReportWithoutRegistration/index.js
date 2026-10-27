import showReport from "./showReport.js";
import sendReportData from "./sendReportData.js";
import uploadFilesButtonHandler from "./uploadFilesButtonHandler.js";
import writeReportToLocalStorage from "./writeReportToLocalStorage.js";
// import checkDateTo from "../index/reportLoaderModalWindow/services/checkDateTo.js";
// import checkDateFrom from "../index/reportLoaderModalWindow/services/checkDateFrom.js";

var errorMsg = "Что-то пошло не так...";
var getReportBtn = document.getElementById("get-report");
var tablesContainer = document.getElementById("tables-container");

var main = async () => {
  try {
    uploadFilesButtonHandler();

    getReportBtn.onclick = async () => {
      localStorage.clear();

      try {
        var token = document.getElementById("token").value;
        var dateFrom = document.getElementById("dateFrom").value;
        var dateTo = document.getElementById("dateTo").value;

        var { validDateFrom } = checkDateFrom(dateFrom);
        var { validDateTo } = checkDateTo(dateTo, validDateFrom);

        document.getElementById("dialog").close();

        var { report, errorText } = await sendReportData(
          validDateFrom,
          validDateTo,
          token,
        );

        if (errorText) {
          alert(errorText);
          return;
        }

        writeReportToLocalStorage(report);

        showReport(report);
      } catch {
        tablesContainer.innerHTML = "";

        var reportSummaryLabels = document.querySelectorAll(
          ".report-summary-label-wrapper",
        );
        reportSummaryLabels.forEach((label) => label.remove());

        alert(errorMsg);
      }
    };
  } catch {
    alert(errorMsg);
  }
};

// main();
