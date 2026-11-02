var requiredFields = ["qty", "costPrice", "otherExpenses", "finalProfit"];

var getPrevSkuValues = (year, skuName, reportId, sku) => {
  var prevSkuFieldsValues = {};

  for (var key in sku) {
    var elemId = `${key}-${skuName}-${reportId}-${year}`;

    var skuCellField = document.getElementById(elemId);

    if (skuCellField && requiredFields.includes(key)) {
      prevSkuFieldsValues[key] = +skuCellField.textContent;
    }
  }

  return { prevSkuFieldsValues };
};

export default getPrevSkuValues;
