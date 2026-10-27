var getPrevSkuFieldsValue = (year, skuName, sku) => {
  var prevSkuFieldsValue = {};

  for (var key in sku) {
    var elemId = [key, skuName, year].join("-");
    var skuField = document.getElementById(elemId);

    if (skuField) {
      prevSkuFieldsValue[key] = +skuField.textContent;
    }
  }

  return { prevSkuFieldsValue };
};

export default getPrevSkuFieldsValue;
