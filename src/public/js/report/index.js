import getReportData from "./getReportData.js";
import navigateTo from "../utils/navigateTo.js";
import splitReport from "./table/splitReport.js";
import createSkusTable from "./table/createSkusTable.js";
import getCookieByName from "../utils/getCookieByName.js";
import deleteReportHandler from "./deleteReportHandler.js";
import createTotalsTable from "./table/createTotalsTable.js";
import { enableActionBar } from "./table/toggleActionBar.js";
import updateReportInfoElem from "./updateReportInfoElem.js";
import switchToFirstTable from "./table/switchToFirstTable.js";
import enableTablesSwitcher from "./table/enableTablesSwitcher.js";
import tablesSwitcherHandler from "./table/tablesSwitcherHandler.js";
import resetReportButtonHandler from "./resetReportButtonHandler.js";
import calcReportTotalsFromSkus from "./table/calcReportTotalsFromSkus.js";
import downloadReportAsXLSXButtonHandler from "./downloadReportAsXLSXButtonHandler.js";
import setSkusLastCostPricesButtonHandler from "./setSkusLastCostPricesButtonHandler.js";
import injectSignedUrlsIntoImgTags from "./table/services/injectSignedUrlsIntoImgTags.js";
import financialAccountingStatusButtonHander from "./financialAccountingStatusButtonHander.js";

var splitedPathName = window.location.pathname.split("/");

var userId = splitedPathName.includes("user")
  ? splitedPathName[3]
  : getCookieByName("userId");

var pathParts = window.location.pathname.split("/");

var reportId = pathParts.at(-1);

var url = "/report/" + userId + "/" + reportId;

var userMainPageUrl = splitedPathName.includes("user")
  ? "/admin/user/" + userId
  : "/my";

var btnToUserMainPage = document.getElementById("main");
btnToUserMainPage.onclick = () => navigateTo(userMainPageUrl);

var bootstrapReportPage = async (url) => {
  var { report, signedUrls, lastCostPrices } = await getReportData(url);

  var { year, reportId, dateFrom, dateTo, skus, isCrossYearPeriod } = report;

  var basicReportData = {
    year,
    userId,
    reportId,
    dateFrom,
    dateTo,
    isCrossYearPeriod,
  };

  var startYear = +dateFrom.split("-")[0];
  var endYear = +dateTo.split("-")[0];
  var years = [startYear, endYear];

  updateReportInfoElem(report);
  deleteReportHandler(userId, reportId);
  downloadReportAsXLSXButtonHandler(report);
  injectSignedUrlsIntoImgTags(userId, signedUrls);
  financialAccountingStatusButtonHander(userId, reportId);

  setSkusLastCostPricesButtonHandler(
    skus,
    years,
    basicReportData,
    lastCostPrices,
  );

  var { reportTotals } = calcReportTotalsFromSkus(skus);

  if (isCrossYearPeriod) {
    var { splitedReport } = splitReport(report);

    var hasSinglePeriodData = splitedReport.length === 1;

    if (!hasSinglePeriodData) {
      createTotalsTable(basicReportData, reportTotals, "", true); //parent totals table

      enableTablesSwitcher(dateFrom, dateTo);

      for (var { year, reportPart } of splitedReport) {
        var { reportTotals } = calcReportTotalsFromSkus(reportPart);

        createTotalsTable(basicReportData, reportTotals, year, false); //child totals table

        createSkusTable(basicReportData, year, reportPart);
      }

      switchToFirstTable(startYear);
      tablesSwitcherHandler(startYear, endYear);

      var startYearSkus = splitedReport[0].reportPart;
      var endYearSkus = splitedReport[1].reportPart;

      resetReportButtonHandler(
        userId,
        reportId,
        isCrossYearPeriod,
        skus,
        startYearSkus,
        endYearSkus,
      );

      return;
    }

    isCrossYearPeriod = false;
    report.isCrossYearPeriod = false;
  }

  createTotalsTable(basicReportData, reportTotals, "", true);

  createSkusTable(basicReportData, startYear, skus);
  enableActionBar(startYear);

  resetReportButtonHandler(userId, reportId, isCrossYearPeriod, skus);
};

bootstrapReportPage(url);

export default bootstrapReportPage;
