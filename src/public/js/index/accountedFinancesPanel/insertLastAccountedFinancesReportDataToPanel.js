import navigateTo from "../../utils/navigateTo.js";
import getReportPeriodText from "./getReportPeriodText.js";

var needToOpenNewWindow = true;
var splitedPathParts = window.location.pathname.split("/");

var insertLastAccountedFinancesReportDataToPanel = (lastAccountedFinances) => {
  var { dateFrom, dateTo, reportId, financesAccountedAt } =
    lastAccountedFinances;

  var reportPeriodElem = document.getElementById("report-period");

  var { reportPeriodText } = getReportPeriodText(dateFrom, dateTo);
  reportPeriodElem.textContent += reportPeriodText;

  var financesAccountedAtElem = document.getElementById(
    "finances-accounted-at",
  );

  financesAccountedAtElem.textContent += financesAccountedAt;

  var buttonToReport = document.getElementById("link-to-report");

  buttonToReport.onclick = () => {
    var url;

    if (splitedPathParts.includes("user")) {
      var userId = splitedPathParts.at(-1);
      url = "/admin/user/" + userId + "/report/" + reportId;
    } else {
      url = "/report/" + reportId;
    }

    navigateTo(url, needToOpenNewWindow);
  };
};

export default insertLastAccountedFinancesReportDataToPanel;
