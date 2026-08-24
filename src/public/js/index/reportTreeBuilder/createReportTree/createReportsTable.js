import getReportLink from "../insertNewReportToTree/table/getReportLink.js";
import getReportPeriod from "../insertNewReportToTree/table/getReportPeriod.js";
import createTdElement from "../../../report/table/services/createTdElement.js";
import createReportsTableHead from "../insertNewReportToTree/table/createReportsTableHead.js";

var createReportsTable = (year, month, reportIds, reports) => {
  var tbody = document.createElement("tbody");

  tbody.id = `tbody_year_${year}_month_${month}`;

  for (var { reportId, dateFrom, dateTo } of reportIds) {
    var tr = document.createElement("tr");
    tr.id = reportId;

    var report = reports.find((report) => report.reportId == reportId);

    var { isFinancesAccounted } = report;

    var fullPeriodTd = getReportPeriod(dateFrom, dateTo);

    var reportLink = getReportLink(reportId);

    var financesAccountedTd = createTdElement();

    financesAccountedTd.textContent = "";
    if (isFinancesAccounted) {
      financesAccountedTd.innerHTML = "<p> &#9989;</p>";
    } else {
      financesAccountedTd.innerHTML = '<span style="color: red;">&#10008;</span>';
    }

    tr.append(fullPeriodTd, financesAccountedTd, reportLink);

    tbody.append(tr);
  }

  var tableHead = createReportsTableHead();

  var table = document.createElement("table");

  table.append(tableHead, tbody);

  return table;
};

export default createReportsTable;
