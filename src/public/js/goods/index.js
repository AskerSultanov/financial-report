import showListGoodsTable from "./showListGoodsTable.js";
import switchSkuTables from "./utils/switchSkuTables.js";
import getCookieByName from "../utils/getCookieByName.js";
import handleDisabledSkusToggle from "./handleDisabledSkusToggle.js";
import getMainPageButtonHandler from "../taxParams/getMainPageButtonHandler.js";
import downloadSkusMetricsFileButtonHandler from "./downloadSkusMetricsFileButtonHandler.js";
import downloadWeeklyPricesFileButtonHandler from "./downloadWeeklyPricesFileButtonHandler.js";
import uploadWeelkyPricesAndDiscountsFileButtonHandler from "./uploadWeelkyPricesAndDiscountsFileButtonHandler.js";

var userId = getCookieByName("userId");

showListGoodsTable(userId);
handleDisabledSkusToggle();
downloadSkusMetricsFileButtonHandler(userId);
downloadWeeklyPricesFileButtonHandler(userId);
uploadWeelkyPricesAndDiscountsFileButtonHandler(userId);

switchSkuTables();
// observeSkusTables()

getMainPageButtonHandler();
