import showReport from "./showReport.js";

var showReportIfExist = () => {
  try {
    var reportAsJSON = localStorage.getItem("report");

    if (reportAsJSON) {
      var report = JSON.parse(reportAsJSON);

      showReport(report);
    }
  } catch {
    return;
  }
};

showReportIfExist();
