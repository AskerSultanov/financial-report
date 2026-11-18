import logoutButtonHandler from "./logout/index.js";
import getMainPageData from "./utils/getMainPageData.js";
import getCookieByName from "../utils/getCookieByName.js";
import bootstrapYearSelector from "./yearSelector/index.js";
import { createReportTree } from "./reportTreeBuilder/index.js";
import accountedFinancesPanelHandler from "./accountedFinancesPanel/index.js";
import reportLoaderModalWindowHandler from "./reportLoaderModalWindow/index.js";
import reportLoadingStatePanelBuilder from "./reportLoadingStatePanel/index.js";
import reportFileUploadModalWindow from "./reportFileUploadModalWindow/index.js";
import openLastYearAndMonthDetails from "./reportTreeBuilder/createReportTree/openLastYearAndMonthDetails.js";

import getGoodsPageButtonHandler from "./utils/getGoodsPageButtonHandler.js";
import getWBTokenPageButtonHandler from "./utils/getWBTokenPageButtonHandler.js";
import getTaxParamsPageButtonHandler from "./utils/getTaxParamsPageButtonHandler.js";
import sortReportPeriodsByYearAndMonths from "./utils/sortReportPeriodsByYearAndMonths.js";

var isMainPageLoad = true;
var userId = getCookieByName("userId");

var bootstrapUserPage = async () => {
  var { data } = await getMainPageData(userId);

  var { basicReportData, reportLoadingState } = data;

  var { reportTree } = sortReportPeriodsByYearAndMonths(basicReportData);

  logoutButtonHandler(userId);
  reportFileUploadModalWindow(userId);
  createReportTree(userId, reportTree);
  reportLoaderModalWindowHandler(userId);

  accountedFinancesPanelHandler(basicReportData);
  reportLoadingStatePanelBuilder(userId, reportLoadingState, isMainPageLoad);

  getGoodsPageButtonHandler();
  getWBTokenPageButtonHandler();
  getTaxParamsPageButtonHandler();

  if (reportTree.length) {
    bootstrapYearSelector(reportTree);
    var lastYear = reportTree[0].year;
    openLastYearAndMonthDetails(lastYear);
  }
};

bootstrapUserPage();
