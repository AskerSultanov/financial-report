import getReportLink from "./table/getReportLink.js";
import createTdElement from "../../../report/table/services/createTdElement.js";
import getReportPeriodText from "../../accountedFinancesPanel/getReportPeriodText.js";

var createReportRow = (reportData) => {
  var { dateFrom, dateTo, reportId } = reportData;

  var { reportPeriodText } = getReportPeriodText(dateFrom, dateTo);
  var reportPeriodTextTd = createTdElement(reportPeriodText);

  var reportLink = getReportLink(reportId);

  var financesAccountedTd = createTdElement();

  financesAccountedTd.textContent = "";
  financesAccountedTd.innerHTML = '<span style="color: red;">&#10008;</span>';

  var tr = document.createElement("tr");
  tr.id = reportId;

  tr.append(reportPeriodTextTd, financesAccountedTd, reportLink);

  return tr;
};

export default createReportRow;
