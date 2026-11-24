import showListGoodsTable from "./showListGoodsTable.js";
import switchSkuTables from "./utils/switchSkuTables.js";
import getCookieByName from "../utils/getCookieByName.js";
import handleDisabledSkusToggle from "./handleDisabledSkusToggle.js";
import getMainPageButtonHandler from "../taxSettings/getMainPageButtonHandler.js";
import downloadSkusMetricsFileButtonHandler from "./downloadSkusMetricsFileButtonHandler.js";
import downloadWeeklyPricesFileButtonHandler from "./downloadWeeklyPricesFileButtonHandler.js";
import uploadWeelkyPricesAndDiscountsFileButtonHandler from "./uploadWeelkyPricesAndDiscountsFileButtonHandler.js";

var bootstrapGoodsPage = (userId) => {
  showListGoodsTable(userId);
  handleDisabledSkusToggle();
  downloadSkusMetricsFileButtonHandler(userId);
  downloadWeeklyPricesFileButtonHandler(userId);
  uploadWeelkyPricesAndDiscountsFileButtonHandler(userId);

  switchSkuTables();
};

export default bootstrapGoodsPage;
