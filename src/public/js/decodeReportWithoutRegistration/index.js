import showReport from "./showReport.js";
import checkTaxRate from "./checkTaxRate.js";
import sendReportData from "./sendReportData.js";
import sendTokenForValidation from "./sendTokenForValidation.js";
import uploadFilesButtonHandler from "./uploadFilesButtonHandler.js";
import writeReportToLocalStorage from "./writeReportToLocalStorage.js";
import checkDateTo from "../index/reportLoaderModalWindow/services/checkDateTo.js";
import checkDateFrom from "../index/reportLoaderModalWindow/services/checkDateFrom.js";
import { showSpinner, hideSpinner } from "../index/reportLoaderModalWindow/services/loaderSpinner.js";

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
        var taxRate = +document.getElementById("tax-rate").value || 0;

        var tokenIsValid = await sendTokenForValidation(token);

        if (!tokenIsValid) {
          alert("Некорректный токен");
          return;
        }

        var { validDateFrom } = checkDateFrom(dateFrom);
        var { validDateTo } = checkDateTo(dateTo, validDateFrom);
        var { taxRate } = checkTaxRate(taxRate);

        document.getElementById("dialog").close();

        showSpinner();

        var report = await sendReportData(validDateFrom, validDateTo, token, taxRate);

        hideSpinner();

        if (!report) {
          throw new Error("Возникла ошибка при получении отчета...\nПопробуйте еще раз");
        }

        writeReportToLocalStorage(report);

        showReport(report);
      } catch (e) {
        tablesContainer.innerHTML = "";

        var reportSummaryLabels = document.querySelectorAll(".report-summary-label-wrapper");
        reportSummaryLabels.forEach((label) => label.remove());

        alert(errorMsg);
        hideSpinner();
      }
    };
  } catch (e) {
    alert(errorMsg);
    hideSpinner();
  }
};

main();
