var columnWidth = 20;

var fontStyles = {
  bold: true,
  font: 10,
};

var alignmentStyles = {
  vertical: "middle",
  horizontal: "center",
  wrapText: true,
};

var setStylesToSkusWorkSheet = (workSheet, columnNum, cellAddress) => {
  workSheet.getCell(cellAddress).font = fontStyles;
  workSheet.getColumn(columnNum).width = columnWidth;
  workSheet.getCell(cellAddress).alignment = alignmentStyles;
};

export default setStylesToSkusWorkSheet;
