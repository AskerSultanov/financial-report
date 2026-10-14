var getReportDateRange = (reports) => {
  var dateRange = new Set();

  for (var { dateFrom, dateTo } of reports) {
    dateRange.add(dateFrom);
    dateRange.add(dateTo);
  }

  var arrFromDateRange = [...dateRange];
  var sortedArr = arrFromDateRange.sort((a, b) => new Date(a) - new Date(b));

  var firstDate = sortedArr[0];
  var lastDate = sortedArr[sortedArr.length - 1];

  return { firstDate, lastDate };
};

export default getReportDateRange;
