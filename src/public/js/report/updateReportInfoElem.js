import getReportPeriodText from "../index/accountedFinancesPanel/getReportPeriodText.js";

var reportPeriodElem = document.getElementById("report-period");
var financialAccountingStatusElem = document.getElementById(
  "financial-accounting-status",
);

var yes = "Да";
var no = "Нет";

var updateReportInfoElem = ({ dateFrom, dateTo, isFinancesAccounted }) => {
  var { reportPeriodText } = getReportPeriodText(dateFrom, dateTo);
  reportPeriodElem.textContent = reportPeriodText;

  financialAccountingStatusElem.textContent = isFinancesAccounted ? yes : no;

  if (isFinancesAccounted) {
    financialAccountingStatusElem.textContent = yes;
    financialAccountingStatusElem.setAttribute("is-finances-accounted", "");
  } else {
    financialAccountingStatusElem.textContent = no;
  }
};

export default updateReportInfoElem;
