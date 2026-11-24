import navigateTo from "../utils/navigateTo.js";
import bootstrapTaxSettingsPage from "../taxSettings/bootstrapTaxSettingsPage.js";

var userId = window.location.pathname.split("/").at(-1);

var btnBackToMainPage = document.getElementById("main");

var urlToUserMainPage = "/admin/user/" + userId;

btnBackToMainPage.onclick = () => {
  navigateTo(urlToUserMainPage);
};

bootstrapTaxSettingsPage(userId);
