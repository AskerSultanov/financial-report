import doRequest from "../../../utils/doRequest.js";

var sendNewDisableStatus = async (skuName, nmID, disableStatus) => {
  var url = "/goods/sku-disable-status";
  var userId = document.cookie.split("=")[1];

  disableStatus = disableStatus === false;

  var res = await doRequest(url, {
    method: "POST",
    body: JSON.stringify({ userId, skuName, nmID, disableStatus }),
    headers: { "content-type": "application/json" },
  });

  if (!res.ok) {
    alert("Не удалось скрыть товар...");
    return;
  }

  return true;
};

export default sendNewDisableStatus;
