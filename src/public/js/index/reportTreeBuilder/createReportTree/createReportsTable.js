import getReportLink from "../insertNewReportToTree/table/getReportLink.js";
import createTdElement from "../../../report/table/services/createTdElement.js";
import getReportPeriodText from "../../accountedFinancesPanel/getReportPeriodText.js";
import createReportsTableHead from "../insertNewReportToTree/table/createReportsTableHead.js";

var createReportsTable = (year, monthName, reportIds) => {
  var reportsTableBodyId = `tbody_year_${year}_month_${monthName}`;
  var reportsTableBody = document.getElementById(reportsTableBodyId);

  if (reportsTableBody) {
    return reportsTableBody;
  }

  reportsTableBody = document.createElement("tbody");
  reportsTableBody.id = reportsTableBodyId;

  for (var { reportId, dateFrom, dateTo, isFinancesAccounted } of reportIds) {
    var tableRow = document.createElement("tr");
    tableRow.id = reportId;

    var { reportPeriodText } = getReportPeriodText(dateFrom, dateTo);
    var reportPeriodTextTd = createTdElement(reportPeriodText);

    var linkToReport = getReportLink(reportId);

    var financesAccountedTd = createTdElement();

    financesAccountedTd.textContent = "";

    if (isFinancesAccounted) {
      financesAccountedTd.innerHTML = "<p> &#9989;</p>";
    } else {
      financesAccountedTd.innerHTML =
        '<span style="color: red;">&#10008;</span>';
    }

    tableRow.append(reportPeriodTextTd, financesAccountedTd, linkToReport);

    reportsTableBody.append(tableRow);
  }

  var tableHead = createReportsTableHead();

  var table = document.createElement("table");

  table.append(tableHead, reportsTableBody);

  return table;
};

export default createReportsTable;
