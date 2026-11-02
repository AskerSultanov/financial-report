var getReportFromLocalStorage = (reportId) => {
  var reportInJson = localStorage.getItem("report_" + reportId);

  var report = JSON.parse(reportInJson);
  return { report };
};
export default getReportFromLocalStorage;
