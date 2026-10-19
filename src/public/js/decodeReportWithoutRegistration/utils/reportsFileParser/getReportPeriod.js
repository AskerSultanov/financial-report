var firstRowNum = 2;
var dateColumnChar = "M";

var getReportPeriod = (workSheet) => {
  var lastRowNum = workSheet.actualRowCount;

  var dateFromCellAddress = dateColumnChar + firstRowNum;
  var dateToCellAddress = dateColumnChar + lastRowNum;

  var dateFrom = workSheet.getCell(dateFromCellAddress).value;
  var dateTo = workSheet.getCell(dateToCellAddress).value;

  return { dateFrom, dateTo };
};

export default getReportPeriod;
