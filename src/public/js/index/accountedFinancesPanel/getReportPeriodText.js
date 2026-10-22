var months = [
  "января",
  "февряля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

var getReportPeriodText = (dateFrom, dateTo, targetPeriod) => {
  var [startYear, startMonth, startDay] = dateFrom.split("-").map(Number);
  var startMonthName = months[startMonth - 1];

  var [endYear, endMonth, endDay] = dateTo.split("-").map(Number);
  var endMonthName = months[endMonth - 1];

  var reportPeriodText;

  if (targetPeriod === dateFrom) {
    reportPeriodText = `с ${startDay} по 31 декабря ${startYear}`;
    `с 1 января ${dateTo} по ${endDay} ${endMonthName} ${endYear}`;
    return { reportPeriodText };
  }

  if (targetPeriod === dateTo) {
    reportPeriodText = `с 1 по ${endDay} ${endMonthName} ${endYear}`;
    return { reportPeriodText };
  }

  if (startYear === endYear) {
    if (startMonth === endMonth) {
      reportPeriodText = `с ${startDay} по ${endDay} ${startMonthName} ${startYear}`;
    } else {
      reportPeriodText = `с ${startDay} ${startMonthName} по ${endDay} ${endMonthName} ${startYear}`;
    }
  } else {
    reportPeriodText = `с ${startDay} ${startMonthName} ${startYear} по ${endDay} ${endMonthName} ${endYear}`;
  }

  return { reportPeriodText };
};

export default getReportPeriodText;
