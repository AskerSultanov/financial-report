var getWeeklyFinancialReportByYear = (report, requiredYear, isCrossYearPeriod) => {
  var weeklyFinancialReportByYear = [];

  if (!report.length) {
    return { weeklyFinancialReportByYear };
  }

  if (!isCrossYearPeriod) {
    return { weeklyFinancialReportByYear: report };
  }

  var requiredYearAsStr = requiredYear + "";

  for (var item of report) {
    var saleYear = item.saleDt.split("-")[0];

    if (saleYear === requiredYearAsStr) {
      weeklyFinancialReportByYear.push(item);
    }
  }

  return { weeklyFinancialReportByYear };
};

export default getWeeklyFinancialReportByYear;
