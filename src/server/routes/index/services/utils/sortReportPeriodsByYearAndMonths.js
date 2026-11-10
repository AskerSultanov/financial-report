var sortReportPeriodsByYearAndMonths = (
  reportPeriods,
  reportsWithAccountedFinances,
) => {
  var sortedReportPeriods = [];

  for (var period of reportPeriods) {
    var { year, monthName, monthIndex, reportId, dateFrom, dateTo } = period;

    var existReport = reportsWithAccountedFinances.find(
      (item) => item.reportId === reportId,
    );

    var isFinancesAccounted = Boolean(existReport);

    var existYear = sortedReportPeriods.find((item) => item?.year === year);

    if (!existYear) {
      var reportsContainer = [
        {
          dateFrom,
          dateTo,
          reportId,
          isFinancesAccounted,
        },
      ];

      var monthsContainer = [
        { monthIndex, month: monthName, reportIds: reportsContainer },
      ];

      sortedReportPeriods.push({ year, months: monthsContainer });
    } else {
      var { months } = existYear;

      var existMonth = months.find((item) => item.month === period.monthName);

      if (!existMonth) {
        var reportsContainer = [
          { dateFrom, dateTo, reportId, isFinancesAccounted },
        ];

        months.push({
          monthIndex,
          month: monthName,
          reportIds: reportsContainer,
        });

        months.sort((a, b) => b.monthIndex - a.monthIndex);
      } else {
        existMonth.reportIds.push({
          dateFrom,
          dateTo,
          reportId,
          isFinancesAccounted,
        });

        existMonth.reportIds.sort(
          (a, b) =>
            new Date(b.dateFrom).getTime() - new Date(a.dateFrom).getTime(),
        );
      }
    }
  }

  sortedReportPeriods.sort((a, b) => b.year - a.year);

  return { sortedReportPeriods };
};

export default sortReportPeriodsByYearAndMonths;
