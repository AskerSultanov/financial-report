import calcProfitMargin from "../calcProfitMargin.js";

var updateTotalsTableFields = (updatedSkuData, years, prevSkuFieldsValue) => {
  var skuKeys = Object.keys(updatedSkuData).filter((key) => key !== "profitMargin");

  for (var skuKey of skuKeys) {
    var totalFieldId = skuKey + "-";

    var totalField = document.getElementById(totalFieldId);

    if (totalField) {
      var prevTotalFieldValue = +totalField.textContent;
      var newTotalFieldValue = prevTotalFieldValue - prevSkuFieldsValue[skuKey] + updatedSkuData[skuKey];

      totalField.textContent = newTotalFieldValue.toFixed(2);

      if (newTotalFieldValue < 0) {
        totalField.style.color = "red";
      } else {
        totalField.style.color = "#04ff00";
      }
    }
  }

  var finalProfitElem = document.getElementById("finalProfit-");
  var retailAmountElem = document.getElementById("retailAmount-");

  var finalProfitElemValue = +finalProfitElem.textContent;
  var retailAmountElemValue = +retailAmountElem.textContent;

  var profitMargin = calcProfitMargin(finalProfitElemValue, retailAmountElemValue);

  var profitMarginElem = document.getElementById("profitMargin-");
  profitMarginElem.textContent = profitMargin;

  if (profitMargin < 0) {
    profitMarginElem.style.color = "red";
  } else {
    profitMarginElem.style.color = "#04ff00";
  }

  if (years.length) {
    for (var year of years) {
      var skuKeys = Object.keys(updatedSkuData).filter((key) => key !== "profitMargin");

      for (var skuKey of skuKeys) {
        var totalFieldId = skuKey + "-" + year;

        var totalField = document.getElementById(totalFieldId);

        if (totalField) {
          var prevTotalFieldValue = +totalField.textContent;
          var newTotalFieldValue = prevTotalFieldValue - prevSkuFieldsValue[skuKey] + updatedSkuData[skuKey];

          totalField.textContent = newTotalFieldValue.toFixed(2);

          if (newTotalFieldValue < 0) {
            totalField.style.color = "red";
          } else {
            totalField.style.color = "#04ff00";
          }
        }
      }

      var finalProfitElem = document.getElementById("finalProfit-" + year);
      var retailAmountElem = document.getElementById("retailAmount-" + year);

      var finalProfitElemValue = +finalProfitElem.textContent;
      var retailAmountElemValue = +retailAmountElem.textContent;

      var profitMargin = calcProfitMargin(finalProfitElemValue, retailAmountElemValue);

      var profitMarginElem = document.getElementById("profitMargin-" + year);
      profitMarginElem.textContent = profitMargin;

      if (profitMargin < 0) {
        profitMarginElem.style.color = "red";
      } else {
        profitMarginElem.style.color = "#04ff00";
      }
    }
  }
};

export default updateTotalsTableFields;
