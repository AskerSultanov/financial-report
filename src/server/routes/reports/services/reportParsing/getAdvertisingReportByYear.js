var getAdvertisingReportByYear = (advertisingReport, requiredYear, isCrossYearPeriod) => {
  var advertisingReportByYear = [];

  if (!advertisingReport.length) {
    return { advertisingReportByYear };
  }

  if (!isCrossYearPeriod) {
    return { advertisingReportByYear: advertisingReport };
  }

  var requiredYearAsStr = requiredYear + "";

  for (var item of advertisingReport) {
    var year = item.updTime.split("-")[0];

    if (year === requiredYearAsStr) {
      advertisingReportByYear.push(item);
    }
  }

  return { advertisingReportByYear };
};

export default getAdvertisingReportByYear;
