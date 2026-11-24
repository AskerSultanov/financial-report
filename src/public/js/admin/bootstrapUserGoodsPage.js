import navigateTo from "../utils/navigateTo.js";
import bootstrapGoodsPage from "../goods/bootstrapGoodsPage.js";

var userId = window.location.pathname.split("/").at(-1);
var btnBackToMainPage = document.getElementById("back-to-main");

bootstrapGoodsPage(userId);

btnBackToMainPage.onclick = () => {
  var url = "/admin/user/" + userId;
  navigateTo(url);
};
