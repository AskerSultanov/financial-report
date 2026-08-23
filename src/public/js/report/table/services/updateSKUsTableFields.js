var updateSkusTableFields = (sku) => {
  var { skuName, data, year } = sku;

  for (var key in data) {
    var elemId = key + "-" + skuName + "-" + year;
    var skuField = document.getElementById(elemId);

    if (skuField) {
      skuField.textContent = data[key];

      if (data[key] < 0) {
        skuField.style.color = "red";
      } else {
        skuField.style.color = "#04ff00";
      }
    }
  }
};

export default updateSkusTableFields;
