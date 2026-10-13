/**
 * @param {'setcostprice' | 'setotherexpenses'} changedData
 */

var sendChangedData = async (data, isGuestAccess = false, changedData) => {
  var targetUrl;

  if (isGuestAccess) {
    var setCostPriceUrl = "/decode-report-without-registration/report/cost-price";
    var setOtherExpensesUrl = "/decode-report-without-registration/report/other-expenses";

    var targetUrl = changedData === "setcostprice" ? setCostPriceUrl : setOtherExpensesUrl;
  } else {
    var setCostPriceUrl = "/report/skus/cost-price";
    var setOtherExpensesUrl = "/report/skus/other-expenses";

    var targetUrl = changedData === "setcostprice" ? setCostPriceUrl : setOtherExpensesUrl;
  }

  var res = await fetch(targetUrl, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  
  if (!res.ok) {
    alert("Не удалось изменить данные");
    return;
  }

  var data = await res.json();
  return data;
};

export default sendChangedData;
