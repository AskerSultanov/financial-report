import navigateTo from "../utils/navigateTo.js";
import bootstrapWBTokenPage from "../wbToken/bootstrapWBTokenPage.js";

var userId = window.location.pathname.split("/").at(-1);
var btnBackToMainPage = document.getElementById("back-to-main-page-btn");

bootstrapWBTokenPage(userId);

btnBackToMainPage.onclick = () => {
  var url = "/admin/user/" + userId;
  navigateTo(url);
};
