var belongsToCurrentMonth = (year, month, day, nextMonthDay) => {
  var daysInMonth = new Date(year, month, 0).getDate();
  return daysInMonth - day >= nextMonthDay;
};

var getReportTargetYearAndMonth = (dateFrom, dateTo) => {
  var [startYear, startMonth, startDays] = dateFrom.split("-").map(Number);
  var [endYear, endMonth, endDays] = dateTo.split("-").map(Number);

  var targetYear;
  var targetMonthIndex;

  if (startMonth !== endMonth) {
    if (belongsToCurrentMonth(startYear, startMonth, startDays, endDays)) {
      targetYear = startYear;
      targetMonthIndex = startMonth - 1;
    } else {
      targetYear = endYear;
      targetMonthIndex = endMonth - 1;
    }
  } else {
    targetYear = startYear;
    targetMonthIndex = startMonth - 1;
  }

  return { targetYear, targetMonthIndex };
};

export default getReportTargetYearAndMonth;
