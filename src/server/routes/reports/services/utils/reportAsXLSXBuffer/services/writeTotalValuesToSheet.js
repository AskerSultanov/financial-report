var fontStyles = { font: 10 };

var alignmentStyles = { vertical: "middle", horizontal: "right" };

var writeTotalValuesToSheet = (sheet, cellNum, totalValues) => {
  var cellName = "B";

  sheet.getColumn(2).width = 17;
  sheet.getColumn(2).font = fontStyles;
  sheet.getColumn(2).alignment = alignmentStyles;

  for (var key in totalValues) {
    var currentCell = cellName + cellNum;
    cellNum++;

    sheet.getCell(currentCell).value = totalValues[key] ?? "";
  }

  return sheet;
};

export default writeTotalValuesToSheet;
