import createTdElement from "../../report/table/services/createTdElement.js";
import getReportPeriodText from "../accountedFinancesPanel/getReportPeriodText.js";

var insertDataToTable = (data, tbodyId) => {
  var tbody = document.getElementById(tbodyId);

  for (var { dateFrom, dateTo, failedCount, index } of data) {
    var tableRow = document.createElement("tr");
    tableRow.id = index;
    tableRow.setAttribute("dateFrom", dateFrom);
    tableRow.setAttribute("dateTo", dateTo);

    var { reportPeriodText } = getReportPeriodText(dateFrom, dateTo);
    var periodTdElement = createTdElement(reportPeriodText);

    var failedCountTdElement = createTdElement(failedCount);

    tableRow.append(periodTdElement, failedCountTdElement);

    tbody.append(tableRow);
  }
};

export default insertDataToTable;
