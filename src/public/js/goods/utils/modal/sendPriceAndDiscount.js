var url = "/goods/prices-discounts/";
var userId = document.cookie.split("=")[1];

var sendPriceAndDiscount = async (
  skuId,
  skuName,
  skuDataToUpdate,
  checkedWeekDays,
  setNewPriceNow,
  expectedPriceExists = false,
) => {
  var res = await fetch(url, {
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
