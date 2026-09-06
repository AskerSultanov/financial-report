var reportRange = 6;

var belongsToCurrentMonth = (year, month, day) => {
  var daysInMonth = new Date(year, month, day).getDate();
  return daysInMonth - day >= reportRange;
};

var getReportTargetYearAndMonth = (dateFrom, dateTo) => {
  var [startYear, startMonth, startDays] = dateFrom.split("-").map(Number);
  var [endYear, endMonth, _] = dateTo.split("-").map(Number);

  var targetYear;
  var targetMonthIndex;

  if (startMonth !== endMonth) {
    if (belongsToCurrentMonth(startYear, startMonth, startDays)) {
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
