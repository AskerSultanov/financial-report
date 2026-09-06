var getPaidStorageReportByYear = (storageReport, requiredYear, isCrossYearPeriod) => {
  var storageReportByYear = [];

  if (!storageReport.length) {
    return { storageReportByYear };
  }

  if (!isCrossYearPeriod) {
    return { storageReportByYear: storageReport };
  }

  var requiredYearAsStr = requiredYear + "";

  for (var item of storageReport) {
    var year = item.date.split("-")[0];

    if (year === requiredYearAsStr) {
      storageReportByYear.push(item);
    }
  }

  return { storageReportByYear };
};

export default getPaidStorageReportByYear;
