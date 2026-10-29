var getReportFromLocalStorage = () => {
  var reportInJson = localStorage.getItem("report");

  var report = JSON.parse(reportInJson);
  return { report };
};
export default getReportFromLocalStorage;
