import getCookieByName from "../utils/getCookieByName.js";
import bootstrapWBTokenPage from "./bootstrapWBTokenPage.js";
import getMainPageButtonHandler from "../taxSettings/getMainPageButtonHandler.js";

var userId = getCookieByName("userId");

getMainPageButtonHandler();
bootstrapWBTokenPage(userId);
