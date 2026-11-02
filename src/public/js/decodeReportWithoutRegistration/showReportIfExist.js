import showReport from "./showReport.js";
import getReportsFromLocalStorage from "./getReportsFromLocalStorage.js";

var showReportIfExist = () => {
  try {
    var { reports } = getReportsFromLocalStorage();

    var report = reports[0];

    showReport(report);
  } catch {
    return;
  }
};

showReportIfExist();
