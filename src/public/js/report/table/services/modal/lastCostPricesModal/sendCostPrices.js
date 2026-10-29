import doRequest from "../../../../../utils/doRequest.js";
import getCookieByName from "../../../../../utils/getCookieByName.js";

var url = "/report/skus/cost-prices";
var userId = getCookieByName("userId");
var reportId = +window.location.pathname.split("/").at(-1);

var sendCostPrices = async (year, costPrices) => {
  var res = await doRequest(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, reportId, year, costPrices }),
  });

  if (!res.ok) {
    alert("Не удалось установить себестоимости...");
    return;
  }

  var data = await res.json();

  return data;
};

export default sendCostPrices;
