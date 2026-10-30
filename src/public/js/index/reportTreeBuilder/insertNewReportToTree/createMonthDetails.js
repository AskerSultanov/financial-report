import createReportRow from "./createReportRow.js";
import createReportsTable from "./createReportsTable.js";

var createMonthDetails = (reportData) => {
  var { year, month } = reportData;

  var summaryToMonthReportsContainer = document.createElement("summary");
  summaryToMonthReportsContainer.append(month);

  var reportRow = createReportRow(reportData);
  var reportsTable = createReportsTable(reportData, reportRow);

  var monthReportsContainerId = `reports_container_${year}_${month}`;
  var monthReportsContainer = document.getElementById(monthReportsContainerId);

  if (!monthReportsContainer) {
    monthReportsContainer = document.createElement("details");
    monthReportsContainer.id = `reports_container_${year}_${month}`;
  }

  monthReportsContainer.append(summaryToMonthReportsContainer, reportsTable);
  return monthReportsContainer;
};

export default createMonthDetails;
