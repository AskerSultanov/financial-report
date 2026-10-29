import logoutButtonHandler from "./logout/index.js";
import getMainPageData from "./utils/getMainPageData.js";
import getCookieByName from "../utils/getCookieByName.js";
import { createReportTree } from "./reportTreeBuilder/index.js";
import enableButtonToAdminPanel from "./utils/enableButtonToAdminPanel.js";
import accountedFinancesPanelHandler from "./accountedFinancesPanel/index.js";
import reportLoaderModalWindowHandler from "./reportLoaderModalWindow/index.js";
import reportLoadingStatePanelBuilder from "./reportLoadingStatePanel/index.js";
import reportFileUploadModalWindow from "./reportFileUploadModalWindow/index.js";

import getGoodsPageButtonHandler from "./utils/getGoodsPageButtonHandler.js";
import getWBTokenPageButtonHandler from "./utils/getWBTokenPageButtonHandler.js";
import getTaxParamsPageButtonHandler from "./utils/getTaxParamsPageButtonHandler.js";

var isMainPageLoad = true;
var userId = getCookieByName("userId");

var bootstrapUserPage = async () => {
  var { data, role } = await getMainPageData(userId);

  var {
    reportTree,
    lastReports,
    reportLoadingState,
    reportsWithAccountedFinances,
  } = data;

  createReportTree(userId, lastReports, reportTree);

  reportLoaderModalWindowHandler(userId);

  reportLoadingStatePanelBuilder(userId, reportLoadingState, isMainPageLoad);
  accountedFinancesPanelHandler(reportsWithAccountedFinances);
  logoutButtonHandler(userId);

  reportFileUploadModalWindow(userId);

  getGoodsPageButtonHandler();
  getWBTokenPageButtonHandler();
  getTaxParamsPageButtonHandler();

  if (role === "admin") enableButtonToAdminPanel();
};

bootstrapUserPage();
