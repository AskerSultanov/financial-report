import getReportPeriodText from "../index/accountedFinancesPanel/getReportPeriodText.js";

var reportPeriodElem = document.getElementById("report-period");
var reportFinancesAccountedStatusElem = document.getElementById(
  "financial-accounting-status",
);

var yes = "Да";
var no = "Нет";

var updateReportInfoElem = ({ dateFrom, dateTo, isFinancesAccounted }) => {
  var { reportPeriodText } = getReportPeriodText(dateFrom, dateTo);
  reportPeriodElem.textContent = reportPeriodText;

  reportFinancesAccountedStatusElem.textContent = isFinancesAccounted
    ? yes
    : no;
};

export default updateReportInfoElem;
