var updateSkusTableFields = (year, skuName, updatedSku) => {
  for (var key in updatedSku) {
    var skuFieldId = key + "-" + skuName + "-" + year;
    var skuField = document.getElementById(skuFieldId);

    if (skuField) {
      var val = +updatedSku[key].toFixed(2);
      var newColor = val < 0 ? "red" : "#04ff00";

      skuField.textContent = val;
      skuField.style.color = newColor;
    }
  }
};

export default updateSkusTableFields;
