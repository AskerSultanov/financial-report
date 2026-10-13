var updateParentTableExtraAmountField = (years, updateField) => {
  var parentTableElemId = updateField + "-";
  var parentTableElem = document.getElementById(parentTableElemId);

  var parentTableElemVal = 0;

  for (var year of years) {
    var childTableElemId = updateField + "-" + year;

    var childTableElem = document.getElementById(childTableElemId);

    var childTableElemValue = +childTableElem.textContent;

    parentTableElemVal += childTableElemValue;
  }

  parentTableElem.textContent = parentTableElemVal.toFixed(2);
};

export default updateParentTableExtraAmountField;
