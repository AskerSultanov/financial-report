var dateFromIndex = 6;

var getReportPeriodFromPaisStorageReportFileName = (fileName) => {
  var splitedFileName = fileName.split("");
  var dateFrom = splitedFileName[dateFromIndex];
  var dateTo = splitedFileName[splitedFileName.length - 1];
  return { paidStorageReportPeriod: dateFrom + "-" + dateTo };
};

export default getReportPeriodFromPaisStorageReportFileName;
