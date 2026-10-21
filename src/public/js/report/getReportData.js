import doRequest from "../utils/doRequest.js";
import navigateTo from "../utils/navigateTo.js";

var splitedPathParts = window.location.pathname.split("/");

var getReportData = async (url) => {
  var res = await doRequest(url);

  var urlToMainPage;
  if (splitedPathParts.includes("user")) {
    var userId = splitedPathParts.at(-1);
    urlToMainPage = "/admin/user/" + userId;
  } else {
    urlToMainPage = "/";
  }

  if (res.status === 404) {
    alert("Отчет не найден");
    navigateTo(urlToMainPage);
  } else if (!res.ok) {
    alert("Ошибка при получении отчета");
    navigateTo(urlToMainPage);
  }

  var { report, signedUrls, skusWithLastCostPrices } = await res.json();

  return { report, signedUrls, skusWithLastCostPrices };
};

export default getReportData;
