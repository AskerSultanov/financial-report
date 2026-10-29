import reportInfo from "./reportInfo.js";
import getReportData from "./getReportData.js";
import createSkusTable from "./table/createSkusTable.js";
import getCookieByName from "../utils/getCookieByName.js";
import deleteReportHandler from "./deleteReportHandler.js";
import createTotalsTable from "./table/createTotalsTable.js";
import resetReportButtonHandler from "./resetReportButtonHandler.js";
import calcReportTotalsFromSkus from "./table/calcReportTotalsFromSkus.js";
import getMainPageButtonHandler from "../taxParams/getMainPageButtonHandler.js";
import downloadReportAsXLSXButtonHandler from "./downloadReportAsXLSXButtonHandler.js";
import setSkusLastCostPricesButtonHandler from "./setSkusLastCostPricesButtonHandler.js";
import getReportPeriodText from "../index/accountedFinancesPanel/getReportPeriodText.js";
import injectSignedUrlsIntoImgTags from "./table/services/injectSignedUrlsIntoImgTags.js";
import financialAccountingStatusButtonHander from "./financialAccountingStatusButtonHander.js";

import switchToFirstTable from "./table/switchToFirstTable.js";
import enableTablesSwitcher from "./table/enableTablesSwitcher.js";
import tablesSwitcherHandler from "./table/tablesSwitcherHandler.js";

var yearValueStub = "";
var reportSummaryLabelTextStub = "";
var splitedPathName = window.location.pathname.split("/");
var userId = splitedPathName.includes("user")
  ? splitedPathName[3]
  : getCookieByName("userId");

var pathParts = window.location.pathname.split("/");

var reportId = pathParts.at(-1);

var url = "/report/" + userId + "/" + reportId;
var urlToDownloadReportAsXLSX = "/report/xlsx/";

var main = async () => {
  var { report, signedUrls, skusWithLastCostPrices } = await getReportData(url);

  var { reportId, dateFrom, dateTo, recordedTo, skus, isCrossYearPeriod } =
    report;

  var { year } = recordedTo;

  var startYear = +dateFrom.split("-")[0];
  var endYear = +dateTo.split("-")[0];
  var years = [startYear, endYear];

  var { reportTotals } = calcReportTotalsFromSkus(skus);

  if (isCrossYearPeriod) {
    enableTablesSwitcher(years);

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

    var startYearReportTotals =
      calcReportTotalsFromSkus(startYearSkus).reportTotals;

    var startReportPeriodText = getReportPeriodText(
      dateFrom,
      dateTo,
      dateFrom,
    ).reportPeriodText;

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

    var endYearReportTotals =
      calcReportTotalsFromSkus(endYearSkus).reportTotals;

    var endReportPeriodText = getReportPeriodText(
      dateFrom,
      dateTo,
      dateTo,
    ).reportPeriodText;
    createTotalsTable(
      userId,
      reportId,
      recordedTo,
      endYearReportTotals,
      endYear,
      true,
      isCrossYearPeriod,
      endReportPeriodText,
    );

    createSkusTable(userId, reportId, endYear, endYearSkus);

    resetReportButtonHandler(
      userId,
      reportId,
      isCrossYearPeriod,
      skus,
      startYearSkus,
      endYearSkus,
    );

    switchToFirstTable(startYear);
    tablesSwitcherHandler(startYear, endYear);
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

    resetReportButtonHandler(userId, reportId, isCrossYearPeriod, skus);
  }

  reportInfo(report);
  deleteReportHandler(userId, reportId);

  injectSignedUrlsIntoImgTags(userId, signedUrls);
  setSkusLastCostPricesButtonHandler(years, skusWithLastCostPrices);
  downloadReportAsXLSXButtonHandler(report, urlToDownloadReportAsXLSX);
  financialAccountingStatusButtonHander(userId, reportId, dateFrom, dateTo);
};

main();
getMainPageButtonHandler();
