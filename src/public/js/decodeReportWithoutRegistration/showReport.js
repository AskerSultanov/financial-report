import createSKUsTable from "./createSKUsTable.js";
import createTotalsTable from "./createTotalsTable.js";
import calcReportTotalsFromSkus from "../report/table/calcReportTotalsFromSkus.js";
import { enableDownloadReportAsXLSXButton } from "./downloadReportAsXLSXButton.js";
import getReportPeriodText from "../index/accountedFinancesPanel/getReportPeriodText.js";
import downloadReportAsXLSXButtonHandler from "../report/downloadReportAsXLSXButtonHandler.js";

var yearValueStub = "";
var isGuestAccess = true;
var reportSummaryLabelTextStub = "";
var downloadReportLink = "/decode-report-without-registration/xlsx/";
var newTextContentToDecodeReportWithoutRegistrationButton = "Получить новый отчёт";
var decodeReportWithoutRegistrationButton = document.getElementById("decode-report-without-registration-button");

var showReport = async (report) => {
  var { dateFrom, dateTo, isCrossYearPeriod, skus } = report;

  var startYear = +report.dateFrom.split("-")[0];
  var endYear = +report.dateTo.split("-")[0];

  var { reportTotals } = calcReportTotalsFromSkus(skus);

  if (isCrossYearPeriod) {
    var startYearSkus = skus.filter((sku) => sku.year === startYear);
    var endYearSkus = skus.filter((sku) => sku.year === endYear);

    var fullReportPeriodText = getReportPeriodText(dateFrom, dateTo).reportPeriodText;

    createTotalsTable(reportTotals, yearValueStub, isCrossYearPeriod, fullReportPeriodText);

    var startYearReportTotals = calcReportTotalsFromSkus(startYearSkus).reportTotals;
    var startReportPeriodText = getReportPeriodText(dateFrom, dateTo, dateFrom).reportPeriodText;

    createTotalsTable(startYearReportTotals, startYear, isCrossYearPeriod, startReportPeriodText);
    createSKUsTable(report, startYearSkus, startYear);

    var endYearReportTotals = calcReportTotalsFromSkus(endYearSkus).reportTotals;
    var endReportPeriodText = getReportPeriodText(dateFrom, dateTo, dateTo).reportPeriodText;

    createTotalsTable(endYearReportTotals, endYear, isCrossYearPeriod, endReportPeriodText);
    createSKUsTable(report, endYearSkus, endYear);
  } else {
    createTotalsTable(reportTotals, yearValueStub, isCrossYearPeriod, reportSummaryLabelTextStub);
    createSKUsTable(report, skus, startYear);
  }

  enableDownloadReportAsXLSXButton();
  downloadReportAsXLSXButtonHandler(report, downloadReportLink, isGuestAccess);

  if (isCrossYearPeriod) {
    window.scrollTo({ top: 500, behavior: "smooth" });
  } else {
    window.scrollTo({ top: 900, behavior: "smooth" });
  }

  decodeReportWithoutRegistrationButton.textContent = newTextContentToDecodeReportWithoutRegistrationButton;
};

export default showReport;
