var firstRowNum = 2;

var getReportPeriod = (workSheet, requiredColumnsName = "M") => {
  var lastRowNum = workSheet.actualRowCount;

  var dateFromCellAddress = "M" + firstRowNum;
  var dateToCellAddress = "M" + lastRowNum;

  var dateFrom = workSheet.getCell(dateFromCellAddress).value;
  var dateTo = workSheet.getCell(dateToCellAddress).value;

  return { dateFrom, dateTo };
};

export default getReportPeriod;
