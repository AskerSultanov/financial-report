import getReportPeriodText from "./getReportPeriodText.js";

var insertLastAccountedFinancesReportDataToPanel = (lastAccountedFinances) => {
  var { dateFrom, dateTo, reportId, financesAccountedAt } = lastAccountedFinances;

  var reportPeriodElem = document.getElementById("report-period");

  var { reportPeriodText } = getReportPeriodText(dateFrom, dateTo);
  reportPeriodElem.textContent += reportPeriodText;

  var financesAccountedAtElem = document.getElementById("finances-accounted-at");

  financesAccountedAtElem.textContent += financesAccountedAt;

  var linkToReportElem = document.getElementById("link-to-report");
  linkToReportElem.href = "/report/" + reportId;
};

export default insertLastAccountedFinancesReportDataToPanel;
