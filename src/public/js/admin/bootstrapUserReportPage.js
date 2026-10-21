import doRequest from "../utils/doRequest.js";
import navigateTo from "../utils/navigateTo.js";
import reportInfo from "../report/reportInfo.js";
import createSkusTable from "../report/table/createSkusTable.js";
import createTotalsTable from "../report/table/createTotalsTable.js";
import deleteReportHandler from "../report/deleteReportHandler.js";
import calcReportTotalsFromSkus from "../report/table/calcReportTotalsFromSkus.js";
import injectSignedUrlsIntoImgTags from "../report/table/services/injectSignedUrlsIntoImgTags.js";
import downloadReportAsXLSXButtonHandler from "../report/downloadReportAsXLSXButtonHandler.js";
import getReportPeriodText from "../index/accountedFinancesPanel/getReportPeriodText.js";
import setSkusLastCostPricesButtonHandler from "../report/setSkusLastCostPricesButtonHandler.js";
import financialAccountingStatusButtonHander from "../report/financialAccountingStatusButtonHander.js";

var yearValueStub = "";
var reportSummaryLabelTextStub = "";
var urlToDownloadReportAsXLSX = "/report/xlsx/";
var btnToUserMainPage = document.getElementById("back-to-main-page-btn");

var splitedPathParts = window.location.pathname.split("/");

var reportId = splitedPathParts.at(-1);
var userId = splitedPathParts.includes("user")
  ? splitedPathParts[3]
  : document.cookie.split("=")[1];

var userMainPageUrl = "/admin/user/" + userId;

btnToUserMainPage.onclick = () => navigateTo(userMainPageUrl);

var url = "/report/" + userId + "/" + reportId;

var getReportData = async () => {
  var res = await doRequest(url);

  if (!res.ok) {
    alert("Ошибка при получении отчета");
    navigateTo("/");
  }

  var data = await res.json();
  return data;
};

var main = async () => {
  var { report, signedUrls, skusLastCostPrice } = await getReportData();
  var { reportId, dateFrom, dateTo, recordedTo, skus, isCrossYearPeriod } =
    report;
  var { year } = recordedTo;

  var startYear = +dateFrom.split("-")[0];
  var endYear = +dateTo.split("-")[0];

  var { reportTotals } = calcReportTotalsFromSkus(skus);

  if (isCrossYearPeriod) {
    var startYearSkus = skus.filter((sku) => sku.year === startYear);
    var endYearSkus = skus.filter((sku) => sku.year === endYear);

    var fullReportPeriodText = getReportPeriodText(
      dateFrom,
      dateTo,
    ).reportPeriodText;

    createTotalsTable(
      userId,
      reportId,
      recordedTo,
      reportTotals,
      yearValueStub,
      isCrossYearPeriod,
      false,
      fullReportPeriodText,
    );

    var startReportPeriodText = getReportPeriodText(
      dateFrom,
      dateTo,
      dateFrom,
    ).reportPeriodText;

    var startYearReportTotals =
      calcReportTotalsFromSkus(startYearSkus).reportTotals;

    createTotalsTable(
      userId,
      reportId,
      recordedTo,
      startYearReportTotals,
      startYear,
      isCrossYearPeriod,
      true,
      startReportPeriodText,
    );

    createSkusTable(userId, reportId, startYear, startYearSkus);

    var endReportPeriodText = getReportPeriodText(
      dateFrom,
      dateTo,
      dateTo,
    ).reportPeriodText;

    var endYearReportTotals =
      calcReportTotalsFromSkus(endYearSkus).reportTotals;

    createTotalsTable(
      userId,
      reportId,
      recordedTo,
      endYearReportTotals,
      endYear,
      isCrossYearPeriod,
      true,
      endReportPeriodText,
    );

    createSkusTable(userId, reportId, endYear, endYearSkus);
  } else {
    createTotalsTable(
      userId,
      reportId,
      recordedTo,
      reportTotals,
      yearValueStub,
      isCrossYearPeriod,
      true,
      reportSummaryLabelTextStub,
    );

    createSkusTable(userId, reportId, year, skus);
  }

  reportInfo(report);
  injectSignedUrlsIntoImgTags(userId, signedUrls);
  deleteReportHandler(userId, reportId, skus);
  downloadReportAsXLSXButtonHandler(report, urlToDownloadReportAsXLSX);
  financialAccountingStatusButtonHander(userId, reportId, dateFrom, dateTo);
  setSkusLastCostPricesButtonHandler(skus, reportId, year, skusLastCostPrice);
};

main();
