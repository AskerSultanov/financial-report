var yearPostfixLength = 5;
var skuTableRowIdPrefixLength = 14;

var getSkuNamesFromSelectedYearSkusTable = (year) => {
  var skusTableBodyId = "skus-tbody-" + year;
  var skusTableBody = document.getElementById(skusTableBodyId);

  var skusNameFromSelectedSkusTable = [];

  for (var tableRow of skusTableBody.children) {
    var tableRowId = tableRow.id;

    var skuName = tableRowId.slice(
      skuTableRowIdPrefixLength,
      -yearPostfixLength,
    );

    skusNameFromSelectedSkusTable.push(skuName);
  }

  return { skusNameFromSelectedSkusTable };
};

export default getSkuNamesFromSelectedYearSkusTable;
