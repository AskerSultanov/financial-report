var dateFromCellAddress = "B2";
var dateToCellAddress = "B3";

var writeReportPeriodToSummaryWorkSheet = (workSheet, dateFrom, dateTo) => {
  workSheet.getCell(dateFromCellAddress).value = dateFrom;
  workSheet.getCell(dateToCellAddress).value = dateTo;

  return workSheet;
};

export default writeReportPeriodToSummaryWorkSheet;
