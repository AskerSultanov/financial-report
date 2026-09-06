var firstRowNum = 3;

var getReportPeriodFromPaidStorageReportFile = (workSheet, requiredColumnsName) => {
  var lastRowNum = workSheet.actualRowCount;

  var dateFromCellAddress = requiredColumnsName.dateColumn + firstRowNum;
  var dateToCellAddress = requiredColumnsName.dateColumn + lastRowNum;

  var dateFrom = workSheet.getCell(dateFromCellAddress).value;
  var dateTo = workSheet.getCell(dateToCellAddress).value;

  return { dateFrom, dateTo };
};

export default getReportPeriodFromPaidStorageReportFile;
