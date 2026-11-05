import getReportPeriodText from "./getReportPeriodText.js";

var tableHeadIndex = 0;
var tableBodyIndex = 1;
var tableHeadRowIndex = 0;
var tableBodyRowIndex = 0;
var totalsTableId = "totals-table-";

var insertReportPeriodToTotalsTable = (dateFrom, dateTo) => {
  var totalsTable = document.getElementById(totalsTableId);

  var tableHead = totalsTable.children.item(tableHeadIndex);
  var tableBody = totalsTable.children.item(tableBodyIndex);

  var tableHeadRow = tableHead.children.item(tableHeadRowIndex);
  var tableBodyRow = tableBody.children.item(tableBodyRowIndex);

  var th = document.createElement("th");
  th.textContent = "Отчетный период";
  tableHeadRow.prepend(th);

  var td = document.createElement("td");
  var { reportPeriodText } = getReportPeriodText(dateFrom, dateTo);
  td.textContent = reportPeriodText;
  tableBodyRow.prepend(td);
};

export default insertReportPeriodToTotalsTable;
