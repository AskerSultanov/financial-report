var fieldsToReset = [
  "tax-",
  "costPrice-",
  "finalProfit-",
  "profitMargin-",
  "insuranceFee-",
  "additionalInsuranceFee-",
];

var resetSkusTable = (skus, year = "") => {
  for (var { skuName } of skus) {
    var skuFieldsId = fieldsToReset.map(
      (field) => field + skuName + "-" + year,
    );

    for (var fieldId of skuFieldsId) {
      var skuField = document.getElementById(fieldId);

      if (skuField) {
        skuField.textContent = 0;
        skuField.style.color = "#e9ecef";
      }
    }
  }
};

var resetTotalsTable = (year = "") => {
  for (var field of fieldsToReset) {
    var fieldId = field + year;

    var totalField = document.getElementById(fieldId);

    if (totalField) {
      totalField.textContent = 0;
      totalField.style.color = "#e9ecef";
    }
  }
};

export { resetSkusTable, resetTotalsTable };
