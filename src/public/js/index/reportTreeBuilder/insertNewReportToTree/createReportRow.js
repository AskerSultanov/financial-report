import getReportLink from "./table/getReportLink.js";
import getReportPeriod from "./table/getReportPeriod.js";
import createTdElement from "../../../report/table/services/createTdElement.js";

var createReportRow = (reportData) => {
  var { dateFrom, dateTo, reportId } = reportData;

  var reportPeriod = getReportPeriod(dateFrom, dateTo);

  var reportLink = getReportLink(reportId);

  var financesAccountedTd = createTdElement();

  financesAccountedTd.textContent = "";
  financesAccountedTd.innerHTML = '<span style="color: red;">&#10008;</span>';

  var tr = document.createElement("tr");
  tr.id = reportId;

  tr.append(reportPeriod, financesAccountedTd, reportLink);

  return tr;
};

export default createReportRow;
