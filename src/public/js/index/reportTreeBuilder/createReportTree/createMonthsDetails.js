import doRequest from "../../../utils/doRequest.js";
import createReportsTable from "./createReportsTable.js";
import createMonthlyReportDownloadButton from "./createMonthlyReportDownloadButton.js";

var url = "/my/api/required-reports/";

var getRequiredReports = async (userId, reportIds) => {
  var res = await doRequest(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      reportIds: reportIds.map((item) => item.reportId),
    }),
  });

  var { reports } = await res.json();

  return { reports };
};

var createDetailsToReportsContainer = (userId, year, month, reportIds) => {
  var summaryToMonthReportsContainer = document.createElement("summary");
  summaryToMonthReportsContainer.append(month);

  var monthReportsContainerId = `reports_container_${year}_${month}`;
  var monthReportsContainer = document.createElement("details");
  monthReportsContainer.id = monthReportsContainerId;

  monthReportsContainer.append(summaryToMonthReportsContainer);

  monthReportsContainer.addEventListener("click", async () => {
    if (!monthReportsContainer.open) {
      var reportTbodyId = `tbody_year_${year}_month_${month}`;

      if (!document.getElementById(reportTbodyId)) {
        var { reports } = await getRequiredReports(userId, reportIds);

        var reportsTable = createReportsTable(year, month, reportIds, reports);
        var downloadBtn = createMonthlyReportDownloadButton(
          userId,
          reportIds,
          year,
          month,
        );

        monthReportsContainer.append(reportsTable, downloadBtn);
        monthReportsContainer.open = true;
      }
    }
  });

  return monthReportsContainer;
};

var createMonthsDetails = (userId, months, year) => {
  var monthsContainer = document.createElement("div");
  monthsContainer.class = "details";
  monthsContainer.id = `months_container_${year}`;

  for (var { month, reportIds } of months) {
    var reportsContainer = createDetailsToReportsContainer(
      userId,
      year,
      month,
      reportIds,
    );
    monthsContainer.append(reportsContainer);
  }

  return monthsContainer;
};

export default createMonthsDetails;
