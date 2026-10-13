var updateSkusTableFields = (sku) => {
  var { data, year, skuName } = sku;

  for (var key in data) {
    var skuFieldId = key + "-" + skuName + "-" + year;
    var skuField = document.getElementById(skuFieldId);

    if (skuField) {
      var val = +data[key].toFixed(2);
      var newColor = val < 0 ? "red" : "#04ff00";

      skuField.textContent = val;
      skuField.style.color = newColor;
    }
  }
};

export default updateSkusTableFields;
