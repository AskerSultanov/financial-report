var getPrevSkuFieldsValue = (skuToUpdation) => {
  var prevSkuFieldsValue = {};

  var { skuName, data, year } = skuToUpdation;

  for (var fieldName in data) {
    var elemId = [fieldName, skuName, year].join("-");
    var skuField = document.getElementById(elemId);

    if (skuField) {
      prevSkuFieldsValue[fieldName] = +skuField.textContent;
    }
  }

  return { prevSkuFieldsValue };
};

export default getPrevSkuFieldsValue;
