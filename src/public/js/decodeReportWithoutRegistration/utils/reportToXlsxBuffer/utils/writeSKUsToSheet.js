import setFormulasToSkusSheet from "./setFormulasToSkusSheet.js";
import { requiredSkusFieldsName } from "./getRequiredSkusFieldsName.js";

var columns = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
];

var alignmentStyles = {
  vertical: "middle",
  horizontal: "center",
};

var writeSKUsToSheet = (sheet, skus) => {
  var rowNum = 2;

  for (var i = 0; i < skus.length; i++) {
    for (var j = 0; j < columns.length; j++) {
      var column = columns[j];
      var cellAddress = column + rowNum;

      var skuField = requiredSkusFieldsName[j];
      var skuFieldValue = skus[i][skuField];

      sheet.getCell(cellAddress).alignment = alignmentStyles;

      sheet.getCell(cellAddress).value = skuFieldValue;
    }

    setFormulasToSkusSheet(sheet, rowNum);

    ++rowNum;
  }

  return sheet;
};

export { writeSKUsToSheet, columns };
