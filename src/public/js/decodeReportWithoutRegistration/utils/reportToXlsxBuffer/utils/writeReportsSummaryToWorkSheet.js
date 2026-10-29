var fontStyles = { font: 10 };
var alignmentStyles = { vertical: "middle", horizontal: "right" };

var writeReportsSummaryToWorkSheet = (workSheet, reportSummary) => {
  var rowNum = 2;
  var cellName = "B";

  workSheet.getColumn(2).width = 17;
  workSheet.getColumn(2).font = fontStyles;
  workSheet.getColumn(2).alignment = alignmentStyles;

  for (var key in reportSummary) {
    var cellAddress = cellName + rowNum;

    workSheet.getCell(cellAddress).value = reportSummary[key] ?? "";

    rowNum++;
  }

  return workSheet;
};

export default writeReportsSummaryToWorkSheet;
