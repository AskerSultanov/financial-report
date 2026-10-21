import navigateTo from "../utils/navigateTo.js";
import getMainPageData from "../index/utils/getMainPageData.js";
import { createReportTree } from "../index/reportTreeBuilder/index.js";
import accountedFinancesPanelHandler from "../index/accountedFinancesPanel/index.js";
import reportLoaderModalWindowHandler from "../index/reportLoaderModalWindow/index.js";
import reportLoadingStatePanelBuilder from "../index/reportLoadingStatePanel/index.js";
import reportFileUploadModalWindow from "../index/reportFileUploadModalWindow/index.js";

var isMainPageLoad = true;

var userId = window.location.pathname.split("/").at(-1);

var bootstrapUserMainPage = async () => {
  var { data } = await getMainPageData(userId);

  var {
    lastReports,
    reportTree,
    reportLoadingState,
    reportsWithAccountedFinances,
  } = data;

  updateLinks(userId);
  createReportTree(userId, lastReports, reportTree);
  accountedFinancesPanelHandler(reportsWithAccountedFinances);
};

bootstrapUserMainPage();

var btnToUserGoodsPage = document.getElementById("goods-page");
var btnToUserWbTokenPage = document.getElementById("wb-token-page");
var btnToBackToAdminPanel = document.getElementById("back-to-admin-panel");
var btnToUserTaxParamsPage = document.getElementById("tax-params-page");

function updateLinks(userId) {
  btnToUserGoodsPage.onclick = () => {
    var url = "/admin/user/goods/" + userId;
    navigateTo(url);
  };
  btnToUserWbTokenPage.onclick = () => {
    var url = "/admin/user/wbtoken/" + userId;
    navigateTo(url);
  };
  btnToUserTaxParamsPage.onclick = () => {
    var url = "/admin/user/tax-params/" + userId;
    navigateTo(url);
  };

  btnToBackToAdminPanel.onclick = () => {
    var url = "/admin";
    navigateTo(url);
  };
}
