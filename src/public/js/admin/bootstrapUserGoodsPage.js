import navigateTo from "../utils/navigateTo.js";
import showListGoodsTable from "../goods/showListGoodsTable.js";
import switchSkuTables from "../goods/utils/switchSkuTables.js";
import downloadSkusMetricsFileButtonHandler from "../goods/downloadSkusMetricsFileButtonHandler.js";
import downloadWeeklyPricesFileButtonHandler from "../goods/downloadWeeklyPricesFileButtonHandler.js";
import uploadWeelkyPricesAndDiscountsFileButtonHandler from "../goods/uploadWeelkyPricesAndDiscountsFileButtonHandler.js";

var userId = window.location.pathname.split("/").at(-1);
var btnBackToMainPage = document.getElementById("back-to-main");

var bootstrapUserGoodsPage = async () => {
  showListGoodsTable(userId);
  downloadSkusMetricsFileButtonHandler(userId);
  downloadWeeklyPricesFileButtonHandler(userId);
  uploadWeelkyPricesAndDiscountsFileButtonHandler(userId);

  switchSkuTables();

  btnBackToMainPage.onclick = () => {
    var url = "/admin/user/" + userId;
    navigateTo(url);
  };
};

bootstrapUserGoodsPage();
