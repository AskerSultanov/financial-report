import calcProfitMargin from "../calcUtils/utils/profitMargin.js";

var updateTotalsTableFields = (
  year,
  updatedSku,
  prevSku,
  isCrossYearPeriod,
) => {
  var yearKeyPart = isCrossYearPeriod ? year : "";

  for (var key in updatedSku) {
    var totalFieldId = key + "-" + yearKeyPart;
    var totalField = document.getElementById(totalFieldId);

    if (totalField && Number.isFinite(prevSku[key])) {
      var prevTotalValue = +totalField.textContent;

      if (key === "costPrice") {
        prevSku[key] = prevSku[key] * updatedSku.qty;
        updatedSku[key] = updatedSku[key] * updatedSku.qty;
      }

      var prevValue = prevSku[key];
      var newValue = updatedSku[key];
      var newTotalValue = prevTotalValue - prevValue + newValue;

      var newColor = newTotalValue < 0 ? "red" : "#04ff00";

      totalField.style.color = newColor;
      totalField.textContent = newTotalValue.toFixed(2);
    }
  }

  var finalProfitElemId = "finalProfit-" + yearKeyPart;
  var retailAmountElemId = "retailAmount-" + yearKeyPart;
  var profitMarginElemId = "profitMargin-" + yearKeyPart;

  var finalProfitElem = document.getElementById(finalProfitElemId);
  var retailAmountElem = document.getElementById(retailAmountElemId);
  var profitMarginElem = document.getElementById(profitMarginElemId);

  var finalProfitElemValue = +finalProfitElem.textContent;
  var retailAmountElemValue = +retailAmountElem.textContent;

  var profitMargin = calcProfitMargin(
    finalProfitElemValue,
    retailAmountElemValue,
  );

  var newColor = profitMargin < 0 ? "red" : "#04ff00";

  profitMarginElem.style.color = newColor;
  profitMarginElem.textContent = profitMargin;
};

export default updateTotalsTableFields;
