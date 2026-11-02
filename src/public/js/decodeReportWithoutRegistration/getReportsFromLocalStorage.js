var getReportsFromLocalStorage = () => {
  var reports = [];

  var keys = Object.keys(localStorage);

  for (var key of keys) {
    if (key.startsWith("report_")) {
      var reportInJSON = localStorage.getItem(key);
      var report = JSON.parse(reportInJSON);
      reports.push(report);
    }
  }

  return { reports };
};

export default getReportsFromLocalStorage;
