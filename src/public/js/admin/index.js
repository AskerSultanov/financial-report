import usersTable from "./usersTable.js";
import doRequest from "../utils/doRequest.js";
import navigateTo from "../utils/navigateTo.js";

var buttonToMainPage = document.getElementById("back-to-main-page");

var url = "/admin/api";
var urlToMainPage = "/my";

var main = async () => {
  var res = await doRequest(url);

  if (!res.ok) {
    alert("Возникла ошибка при получении пользователей");
    return;
  }

  var { users } = await res.json();

  usersTable(users);
};

main();

buttonToMainPage.onclick = () => navigateTo(urlToMainPage);
