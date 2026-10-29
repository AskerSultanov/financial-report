var writeReportToLocalStorage = (report) => {
  var reportInJson = JSON.stringify(report);

  localStorage.setItem("report", reportInJson);
};

export default writeReportToLocalStorage;
