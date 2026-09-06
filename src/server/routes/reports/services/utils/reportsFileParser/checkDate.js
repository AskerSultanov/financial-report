var dayStub = 15;
var daysInWeek = 7;
var mondayIndex = 1;
var sundayIndex = 0;
var reportRange = 6;
var firstMonthNum = 1;
var lastMonthNum = 12;
var firstMonthIndex = 0;
var pseudoSundayIndex = 7;

var checkAndFixMonday = (dateFrom) => {
  var [year, month, day] = dateFrom.split("-");

  var date = new Date(year, month - 1, day);
  var dayIndex = date.getDay();
  var daysPerMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  var isMonday = dayIndex === mondayIndex;

  if (isMonday) {
    return { dateFrom };
  }

  var isReportStartInPreviousMonth = +day - reportRange < 1;

  if (isReportStartInPreviousMonth) {
    var isFirstMonth = firstMonthNum === +month;

    if (isFirstMonth) {
      var prevYear = +year - 1;
      var lastMonthDate = new Date(prevYear, lastMonthNum, dayStub);
      var daysPerLastMonth = new Date(lastMonthDate.getFullYear(), lastMonthDate.getMonth() + 1, 0).getDate();
      var mondayDay = daysPerLastMonth + +day - reportRange;

      dateFrom = `${prevYear}-${lastMonthNum}-${String(mondayDay).padStart(2, "0")}`;
    } else {
      var prevMonthNum = +month - 1;
      var prevMonthDate = new Date(year, prevMonthNum - 1, day);
      var daysPerPrevMonth = new Date(prevMonthDate.getFullYear(), prevMonthDate.getMonth() + 1, 0).getDate();

      var isSunday = dayIndex === sundayIndex;

      if (isSunday) {
        var restIndexesInCurrentMonth = +day - pseudoSundayIndex + 1;
      } else {
        var restIndexesInCurrentMonth = +day - dayIndex + 1;
      }

      var mondayDay = daysPerPrevMonth + restIndexesInCurrentMonth;
      dateFrom = `${year}-${String(prevMonthNum).padStart(2, "0")}-${String(mondayDay).padStart(2, "0")}`;
    }
  } else {
    var mondayDay;
    var dayAsNum = +day;
    var isSunday = dayIndex === sundayIndex;

    if (isSunday) {
      mondayDay = dayAsNum - reportRange;
    } else {
      var dayIndexDiff = dayIndex - mondayIndex;
      mondayDay = dayAsNum - dayIndexDiff;
    }

    dateFrom = `${year}-${month}-${String(mondayDay).padStart(2, "0")}`;
  }

  return { dateFrom };
};

var checkAndFixSunday = (dateTo) => {
  var [year, month, day] = dateTo.split("-");
  var date = new Date(year, month - 1, day);
  var dayIndex = date.getDay();

  var isSunday = dayIndex === sundayIndex;

  if (isSunday) {
    return { dateTo };
  }

  var daysPerMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  var daysSum = +day + reportRange;
  var restDays = daysPerMonth - +day;
  var isReportEndInNextMonth = daysSum > daysPerMonth;

  var daysToSunday = pseudoSundayIndex - dayIndex;
  var daysToSundayInCurrentMonth = -(restDays - daysToSunday);

  if (isReportEndInNextMonth) {
    var isLastMonth = lastMonthNum === +month;

    if (isLastMonth) {
      var nextYear = +year + 1;
      var firstMonthDate = new Date(nextYear, firstMonthIndex, dayStub);
      var daysPerFirstMonth = new Date(firstMonthDate.getFullYear(), firstMonthDate.getMonth() + 1, 0).getDate();

      dateTo = `${nextYear}-${String(firstMonthNum).padStart(2, "0")}-${String(daysToSundayInCurrentMonth).padStart(2, "0")}`;
    } else {
      var nextMonthNum = +month + 1;
      var nextMonthDate = new Date(year, nextMonthNum - 1, dayStub);
      var daysPerNextMonth = new Date(nextMonthDate.getFullYear(), nextMonthDate.getMonth() + 1, 0).getDate();

      dateTo = `${year}-${String(nextMonthNum).padStart(2, "0")}-${String(daysToSundayInCurrentMonth).padStart(2, "0")}`;
    }
  } else {
    var sundayDay = +day + daysToSunday;
    dateTo = `${year}-${month}-${String(sundayDay).padStart(2, "0")}`;
  }

  return { dateTo };
};

export { checkAndFixMonday, checkAndFixSunday };
