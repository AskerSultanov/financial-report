import reportInfo from "./reportInfo.js";
import createSKUsTable from "./table/createSKUsTable.js";
import createTotalsTable from "./table/createTotalsTable.js";
import deleteReportHandler from "./deleteReportHandler.js";
import splitReportByYear from "./table/services/splitReportByYear.js";
import injectBase64IntoImgTags from "./table/services/injectBase64IntoImgTags.js";
import downloadReportAsXLSXButtonHandler from "./downloadReportAsXLSXButtonHandler.js";
import getReportPeriodText from "../index/accountedFinancesPanel/getReportPeriodText.js";
import setSkusLastCostPricesButtonHandler from "./setSkusLastCostPricesButtonHandler.js";
import financialAccountingStatusButtonHander from "./financialAccountingStatusButtonHander.js";

var postfixStub = "";
var yearValueStub = "";
var reportSummaryLabelTextStub = "";
var currentYearPostfix = "InCurrentYear";
var nextYearPostfix = "InNextYear";
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
  var { report, skuImages, skusLastCostPrice } = await getReportData();
  var { reportId, dateFrom, dateTo, recordedTo, skus, isCrossYearPeriod } = report;
  var { year } = recordedTo;

  if (isCrossYearPeriod) {
    var startYear = dateFrom.split("-")[0];
    var endYear = dateTo.split("-")[0];

    var fullPeriod = startYear + "-" + endYear;
    var fullReportPeriodText = getReportPeriodText(dateFrom, dateTo).reportPeriodText;
    createTotalsTable(report, yearValueStub, isCrossYearPeriod, fullReportPeriodText, postfixStub);

    var { startYearReportData, endYearReportData } = splitReportByYear(report);

    var startReportPeriodText = getReportPeriodText(dateFrom, dateTo, dateFrom).reportPeriodText;
    createTotalsTable(startYearReportData, startYear, isCrossYearPeriod, startReportPeriodText, currentYearPostfix);
    createSKUsTable(startYearReportData, currentYearPostfix, startYear);

    var endReportPeriodText = getReportPeriodText(dateFrom, dateTo, dateTo).reportPeriodText;
    createTotalsTable(endYearReportData, endYear, isCrossYearPeriod, endReportPeriodText, nextYearPostfix);
    createSKUsTable(endYearReportData, nextYearPostfix, endYear);
  } else {
    createTotalsTable(report, yearValueStub, isCrossYearPeriod, reportSummaryLabelTextStub, postfixStub);
    createSKUsTable(report, postfixStub, year);
  }

  setSkusLastCostPricesButtonHandler(skus, reportId, year, skusLastCostPrice);

  reportInfo(report);

  injectBase64IntoImgTags(skuImages);

  downloadReportAsXLSXButtonHandler(report);
  deleteReportHandler(userId, reportId, skus);

  var isFinancesAccountingEditable = skus.find((sku) => sku.isCostPriceSet);

  if (isFinancesAccountingEditable) {
    financialAccountingStatusButtonHander(userId, reportId);
  }
};

main();
