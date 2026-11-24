import getCookieByName from "../utils/getCookieByName.js";
import bootstrapTaxSettingsPage from "./bootstrapTaxSettingsPage.js";
import getMainPageButtonHandler from "./getMainPageButtonHandler.js";

var userId = getCookieByName("userId");

getMainPageButtonHandler();
bootstrapTaxSettingsPage(userId);
