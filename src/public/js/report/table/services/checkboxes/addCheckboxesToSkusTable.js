import createCheckboxElem from "./createCheckboxElem.js";
import primaryCheckboxHandler from "./primaryCheckboxHandler.js";

var addCheckboxesToSkusTable = (skus) => {
  for (var sku of skus) {
    var { year, skuName } = sku;

    var skuTableRowId = `sku-table-row-${skuName}-${year}`;
    var skuTableRow = document.getElementById(skuTableRowId);

    var { checkbox } = createCheckboxElem(year, skuName);

    skuTableRow.prepend(checkbox); //secondary checkbox
  }

  var { year } = skus[0];
  var { checkbox } = createCheckboxElem(year); //primary checkbox
  checkbox.id = "checkbox-" + year;

  checkbox.addEventListener("change", (e) => {
    var isChecked = e.target.checked;
    primaryCheckboxHandler(year, isChecked);
  });

  var tableHeadRowId = "thead-tr-" + year;
  var tableHeadRow = document.getElementById(tableHeadRowId);

  tableHeadRow.prepend(checkbox);

  //update skus table scroll max-width;
  var skusTableScrollElemId = "scroll-skus-table-" + year;
  var skusTableScrollElem = document.getElementById(skusTableScrollElemId);
  skusTableScrollElem.style.maxWidth = 1350;
};

export default addCheckboxesToSkusTable;
