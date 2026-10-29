import setFormulasToSkusWorkSheet from "./setFormulasToSkusWorkSheet.js";

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
  "Q",
  "R",
];

var alignmentStyles = {
  vertical: "middle",
  horizontal: "center",
};

var startRowNum = 6;

var writeValuesToSkusWorkSheet = (workSheet, skus) => {
  var rowNum = startRowNum;

  for (var sku of skus) {
    var columnCount = 0;

    for (var key in sku) {
      var column = columns[columnCount];

      var cellAddress = column + rowNum;

      var value = sku[key];

      workSheet.getCell(cellAddress).value = value;
      workSheet.getCell(cellAddress).alignment = alignmentStyles;

      columnCount++;
    }

    setFormulasToSkusWorkSheet(workSheet, rowNum);

    rowNum++;
  }

  return workSheet;
};

export { writeValuesToSkusWorkSheet, columns };
