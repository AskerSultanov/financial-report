import calcProfitMargin from "./calcProfitMargin.js";

var fieldsToReset = [
  "tax-",
  "costPrice-",
  "insuranceFee-",
  "additionalInsuranceFee-",
];

var fieldsToReplace = ["finalProfit-"];
var fieldsToRecalculate = ["profitMargin-"];

var resetSkusTable = (skus, year = "") => {
  for (var sku of skus) {
    var callback = (field) => field + sku.skuName + "-" + year;

    var skuFieldsIdToReset = fieldsToReset.map(callback);

    var skuFieldsToReplace = fieldsToReplace.map(callback);

    var skuFieldsToRecalculate = fieldsToRecalculate.map(callback);

    for (var fieldId of skuFieldsIdToReset) {
      var skuField = document.getElementById(fieldId);

      if (skuField) {
        skuField.textContent = 0;
        skuField.style.color = "#e9ecef";
      }
    }

    for (var fieldId of skuFieldsToReplace) {
      var skuField = document.getElementById(fieldId);

      if (skuField) {
        skuField.textContent = sku.profit;
        skuField.style.color = "#e9ecef";
      }
    }

    for (var fieldId of skuFieldsToRecalculate) {
      var skuField = document.getElementById(fieldId);

      if (skuField) {
        skuField.style.color = "#e9ecef";
        skuField.textContent = calcProfitMargin(sku.profit, sku.retailAmount);
      }
    }
  }
};

var resetTotalsTable = (skus, year = "") => {
  var totalFinalProfit = skus.reduce((acc, i) => acc + i.profit, 0);
  var totalRetailAmount = skus.reduce((acc, i) => acc + i.retailAmount, 0);
  var totalProfitMargin = calcProfitMargin(totalFinalProfit, totalRetailAmount);

  for (var field of fieldsToReset) {
    var fieldId = field + year;

    var totalField = document.getElementById(fieldId);

    if (totalField) {
      totalField.textContent = 0;
      totalField.style.color = "#e9ecef";
    }
  }

  for (var field of fieldsToRecalculate) {
    var fieldId = field + year;

    var totalField = document.getElementById(fieldId);

    if (totalField) {
      totalField.style.color = "#e9ecef";
      totalField.textContent = totalProfitMargin;
    }
  }

  for (var field of fieldsToReplace) {
    var fieldId = field + year;

    var totalField = document.getElementById(fieldId);

    if (totalField) {
      totalField.style.color = "#e9ecef";
      totalField.textContent = totalFinalProfit.toFixed(2);
    }
  }
};

export { resetSkusTable, resetTotalsTable };
