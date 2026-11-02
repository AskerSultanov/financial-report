var writeReportToLocalStorage = (report) => {
  var reportInJson = JSON.stringify(report);

  localStorage.setItem("report_" + report.reportId, reportInJson);
};

export default writeReportToLocalStorage;
