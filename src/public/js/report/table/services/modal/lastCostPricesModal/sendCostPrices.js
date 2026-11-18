import doRequest from "../../../../../utils/doRequest.js";

var url = "/report/skus/cost-prices";

var sendCostPrices = async (year, basicReportData, costPrices) => {
  var { dateFrom, dateTo, userId, reportId } = basicReportData;

  var res = await doRequest(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      reportId,
      dateFrom,
      dateTo,
      year,
      costPrices,
    }),
  });

  if (!res.ok) {
    alert("Не удалось установить себестоимости...");
    return;
  }

  var data = await res.json();

  return data;
};

export default sendCostPrices;
