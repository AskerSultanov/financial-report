var updateSkusTableFields = (year, skuName, updatedSku) => {
  for (var key in updatedSku) {
    var fieldId = `${key}-${skuName}-${year}`;

    var skuField = document.getElementById(fieldId);

    if (skuField) {
      var val = +updatedSku[key].toFixed(2);
      var newColor = val < 0 ? "red" : "#04ff00";

      skuField.textContent = val;
      skuField.style.color = newColor;
    }
  }
};

export default updateSkusTableFields;
