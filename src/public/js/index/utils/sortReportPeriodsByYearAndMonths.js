var monthList = [
  "январь",
  "февраль",
  "марта",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабрь",
];

var sortReportPeriodsByYearAndMonths = (reports) => {
  var reportTree = [];

  for (var report of reports) {
    var { year, monthIndex, reportId, isFinancesAccounted, dateFrom, dateTo } =
      report;

    var month = monthList[monthIndex];

    var existYear = reportTree.find((item) => item?.year === year);

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
        { month, monthIndex, reportIds: reportsContainer },
      ];

      reportTree.push({ year, months: monthsContainer });
    } else {
      var { months } = existYear;

      var existMonth = months.find((item) => item.month === month);

      if (!existMonth) {
        var reportsContainer = [
          { dateFrom, dateTo, reportId, isFinancesAccounted },
        ];

        months.push({
          month,
          monthIndex,
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

  reportTree.sort((a, b) => b.year - a.year);

  return { reportTree };
};

export default sortReportPeriodsByYearAndMonths;
