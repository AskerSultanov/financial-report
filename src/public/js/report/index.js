import reportInfo from "./reportInfo.js";
import createSkusTable from "./table/createSkusTable.js";
import deleteReportHandler from "./deleteReportHandler.js";
import createTotalsTable from "./table/createTotalsTable.js";
import calcReportTotalsFromSkus from "./table/calcReportTotalsFromSkus.js";
import injectBase64IntoImgTags from "./table/services/injectBase64IntoImgTags.js";
import downloadReportAsXLSXButtonHandler from "./downloadReportAsXLSXButtonHandler.js";
import getReportPeriodText from "../index/accountedFinancesPanel/getReportPeriodText.js";
import setSkusLastCostPricesButtonHandler from "./setSkusLastCostPricesButtonHandler.js";
import financialAccountingStatusButtonHander from "./financialAccountingStatusButtonHander.js";

var yearValueStub = "";
var reportSummaryLabelTextStub = "";
var splitedPathName = window.location.pathname.split("/");
var userId = splitedPathName.includes("user") ? splitedPathName[3] : document.cookie.split("=")[1];

var pathParts = window.location.pathname.split("/");

var reportId = pathParts.at(-1);

var url = "/report/" + userId + "/" + reportId;

var getReportData = async () => {
  var res = await fetch(url);

  if (res.status === 404) {
    alert("Отчет не найден");
    window.location.href = "/";
  } else if (!res.ok) {
    alert("Ошибка при получении отчета");
    window.location.href = "/";
  }

  var data = await res.json();

  return data;
};

var main = async () => {
  var { report, skuImages, skusWithLastCostPrices } = await getReportData();

  var { reportId, dateFrom, dateTo, recordedTo, skus, isCrossYearPeriod, taxRate } = report;
  var { year } = recordedTo;

  var startYear = +dateFrom.split("-")[0];
  var endYear = +dateTo.split("-")[0];
  var years = [startYear, endYear];

  var { reportTotals } = calcReportTotalsFromSkus(skus);

  if (isCrossYearPeriod) {
    var startYearSkus = skus.filter((sku) => sku.year === startYear);
    var endYearSkus = skus.filter((sku) => sku.year === endYear);

    var fullReportPeriodText = getReportPeriodText(dateFrom, dateTo).reportPeriodText;

    createTotalsTable(reportTotals, yearValueStub, isCrossYearPeriod, fullReportPeriodText);

    var startYearReportTotals = calcReportTotalsFromSkus(startYearSkus).reportTotals;
    var startReportPeriodText = getReportPeriodText(dateFrom, dateTo, dateFrom).reportPeriodText;
    createTotalsTable(startYearReportTotals, startYear, isCrossYearPeriod, startReportPeriodText);

    createSkusTable(userId, reportId, startYear, startYearSkus);

    var endYearReportTotals = calcReportTotalsFromSkus(endYearSkus).reportTotals;
    var endReportPeriodText = getReportPeriodText(dateFrom, dateTo, dateTo).reportPeriodText;
    createTotalsTable(endYearReportTotals, endYear, isCrossYearPeriod, endReportPeriodText);

    createSkusTable(userId, reportId, endYear, endYearSkus);
  } else {
    createTotalsTable(reportTotals, yearValueStub, isCrossYearPeriod, reportSummaryLabelTextStub);
    createSkusTable(userId, reportId, year, skus);
  }

  reportInfo(report);
  injectBase64IntoImgTags(skuImages);
  downloadReportAsXLSXButtonHandler(report);
  deleteReportHandler(userId, reportId, skus);
  financialAccountingStatusButtonHander(userId, reportId);
  setSkusLastCostPricesButtonHandler(years, skusWithLastCostPrices);
};

main();
