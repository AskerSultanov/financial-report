var fontStyles = { font: 10 };
var alignmentStyles = { vertical: "middle", horizontal: "right" };

var columnWidth = 17;
var columnNumOfValues = 2;

var setStylesToSummaryWorkSheet = (workSheet) => {
  workSheet.getColumn(columnNumOfValues).font = fontStyles;
  workSheet.getColumn(columnNumOfValues).width = columnWidth;
  workSheet.getColumn(columnNumOfValues).alignment = alignmentStyles;

  return workSheet;
};

export default setStylesToSummaryWorkSheet;
