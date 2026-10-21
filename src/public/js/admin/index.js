import usersTable from "./usersTable.js";
import doRequest from "../utils/doRequest.js";
import navigateTo from "../utils/navigateTo.js";

var buttonToMainPage = document.getElementById("back-to-main-page");

var url = "/admin/api";

var getMainPageData = async () => {
  var res = await doRequest(url);

  var { users } = await res.json();
  return { users };
};

var main = async () => {
  var { users } = await getMainPageData();

  usersTable(users);
};

main();
buttonToMainPage.onclick = () => navigateTo("/");
