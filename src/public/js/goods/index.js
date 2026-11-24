import bootstrapGoodsPage from "./bootstrapGoodsPage.js";
import getCookieByName from "../utils/getCookieByName.js";
import getMainPageButtonHandler from "../taxSettings/getMainPageButtonHandler.js";

var userId = getCookieByName("userId");

bootstrapGoodsPage(userId);
getMainPageButtonHandler();
