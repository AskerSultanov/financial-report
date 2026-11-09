import doRequest from "../../../utils/doRequest.js";

/**
 * @param {'costPrice' | 'otherExpenses'} targetUrlEnding
 */

var sendChangedData = async (data, targetUrlEnding) => {
  targetUrlEnding =
    targetUrlEnding === "costPrice" ? "cost-price" : "other-expenses";

  var url = "/report/skus/" + targetUrlEnding;

  var res = await doRequest(url, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  if (res.status === 406) {
    alert("Себестоимость не будет установлена: отсутствуют проданные единицы.");
    return;
  }

  if (!res.ok) {
    alert("Не удалось изменить данные");
    return;
  }

  var data = await res.json();
  return data;
};

export default sendChangedData;
