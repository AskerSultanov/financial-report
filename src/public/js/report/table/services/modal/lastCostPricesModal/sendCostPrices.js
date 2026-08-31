var url = "/report/skus/cost-prices";
var userId = document.cookie.split("=")[1];
var reportId = +window.location.pathname.split("/").at(-1);

var sendCostPrices = async (year, costPrices) => {
  var res = await fetch(url, {
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
