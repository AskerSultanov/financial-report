import doRequest from "../../../utils/doRequest.js";
import getCookieByName from "../../../utils/getCookieByName.js";

var url = "/goods/prices-discounts/";
var userId = getCookieByName("userId");

var sendPriceAndDiscount = async (
  skuId,
  skuName,
  skuDataToUpdate,
  checkedWeekDays,
  setNewPriceNow,
  expectedPriceExists = false,
) => {
  var res = await doRequest(url, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      skuId,
      userId,
      skuName,
      skuDataToUpdate,
      checkedWeekDays,
      setNewPriceNow,
      expectedPriceExists,
      requiredTokenType: "set",
    }),
  });

  var data = await res.json();

  if (data?.errorText) {
    alert(data.errorText);
    return;
  }

  return true;
};

export default sendPriceAndDiscount;
