import createReportsTable from "./createReportsTable.js";
import createMonthlyReportDownloadButton from "./createMonthlyReportDownloadButton.js";

var createDetailsToReportsTable = (userId, year, month, reportIds) => {
  var monthDetails = document.createElement("details");

  var monthDetailsId = `reports_container_${year}_${month}`;
  monthDetails.id = monthDetailsId;

  var summary = document.createElement("summary");

  summary.onclick = () => {
    if (monthDetails?.open) {
      monthDetails.open = true;
    } else {
      monthDetails.open = false;
    }
  };

  summary.append(month);
  monthDetails.append(summary);

  var reportsTable = createReportsTable(year, month, reportIds);
  var downloadBtn = createMonthlyReportDownloadButton(
    userId,
    year,
    month,
    reportIds,
  );

  monthDetails.append(reportsTable, downloadBtn);

  return monthDetails;
};

var createMonthsDetails = (userId, months, year) => {
  var monthsContainer = document.createElement("div");
  monthsContainer.class = "details";
  monthsContainer.id = `months_container_${year}`;

  for (var { month, reportIds } of months) {
    var monthDetails = createDetailsToReportsTable(
      userId,
      year,
      month,
      reportIds,
    );

    monthsContainer.append(monthDetails);
  }

  return monthsContainer;
};

export default createMonthsDetails;
