var getReportFromLocalStorage = (reportId) => {
  var reportInJson = localStorage.getItem(reportId);

  var report = JSON.parse(reportInJson);
  return { report };
};
export default getReportFromLocalStorage;
