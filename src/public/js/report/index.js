import getReportData from "./getReportData.js";
import splitReport from "./table/splitReport.js";
import createSkusTable from "./table/createSkusTable.js";
import getCookieByName from "../utils/getCookieByName.js";
import deleteReportHandler from "./deleteReportHandler.js";
import createTotalsTable from "./table/createTotalsTable.js";
import { enableActionBar } from "./table/toggleActionBar.js";
import updateReportInfoElem from "./updateReportInfoElem.js";
import resetReportButtonHandler from "./resetReportButtonHandler.js";
import calcReportTotalsFromSkus from "./table/calcReportTotalsFromSkus.js";
import getMainPageButtonHandler from "../taxParams/getMainPageButtonHandler.js";
import downloadReportAsXLSXButtonHandler from "./downloadReportAsXLSXButtonHandler.js";
import setSkusLastCostPricesButtonHandler from "./setSkusLastCostPricesButtonHandler.js";
import injectSignedUrlsIntoImgTags from "./table/services/injectSignedUrlsIntoImgTags.js";
import financialAccountingStatusButtonHander from "./financialAccountingStatusButtonHander.js";

import switchToFirstTable from "./table/switchToFirstTable.js";
import enableTablesSwitcher from "./table/enableTablesSwitcher.js";
import tablesSwitcherHandler from "./table/tablesSwitcherHandler.js";

var splitedPathName = window.location.pathname.split("/");

var userId = splitedPathName.includes("user")
  ? splitedPathName[3]
  : getCookieByName("userId");

var pathParts = window.location.pathname.split("/");

var reportId = pathParts.at(-1);

var url = "/report/" + userId + "/" + reportId;

var main = async () => {
  var { report, signedUrls, skusWithLastCostPrices } = await getReportData(url);

  var { reportId, dateFrom, dateTo, recordedTo, skus, isCrossYearPeriod } =
    report;

  var { year } = recordedTo;

  var startYear = +dateFrom.split("-")[0];
  var endYear = +dateTo.split("-")[0];
  var years = [startYear, endYear];

  updateReportInfoElem(report);
  deleteReportHandler(userId, reportId);
  downloadReportAsXLSXButtonHandler(report);
  injectSignedUrlsIntoImgTags(userId, signedUrls);
  setSkusLastCostPricesButtonHandler(years, skusWithLastCostPrices);
  financialAccountingStatusButtonHander(userId, reportId, dateFrom, dateTo);

  var { reportTotals } = calcReportTotalsFromSkus(skus);

  if (isCrossYearPeriod) {
    var { splitedReport } = splitReport(report);

    var hasSinglePeriodData = splitedReport.length === 1;

    if (!hasSinglePeriodData) {
      createTotalsTable(
        reportTotals,
        reportId,
        recordedTo,
        reportTotals,
        "",
        isCrossYearPeriod,
        true,
      ); //parent totals table

      enableTablesSwitcher(dateFrom, dateTo);

      for (var { year, reportPart } of splitedReport) {
        var { reportTotals } = calcReportTotalsFromSkus(reportPart);

        createTotalsTable(
          userId,
          reportId,
          recordedTo,
          reportTotals,
          year,
          isCrossYearPeriod,
          false,
        ); //child totals table

        createSkusTable(userId, reportId, year, reportPart, isCrossYearPeriod);
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

  createTotalsTable(
    userId,
    reportId,
    recordedTo,
    reportTotals,
    "",
    isCrossYearPeriod,
    true,
  );

  createSkusTable(userId, reportId, startYear, skus, isCrossYearPeriod);
  enableActionBar(startYear);

  resetReportButtonHandler(userId, reportId, isCrossYearPeriod, skus);
};

main();
getMainPageButtonHandler();
