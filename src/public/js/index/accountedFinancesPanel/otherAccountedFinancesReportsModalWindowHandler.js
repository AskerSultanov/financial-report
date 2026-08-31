import getReportPeriodText from "./getReportPeriodText.js";
import createThElement from "../../report/table/services/createThElement.js";
import createTdElement from "../../report/table/services/createTdElement.js";
import createDiv from "../../report/table/services/modal/utils/createDiv.js";
import createTitle from "../../report/table/services/modal/utils/createTitle.js";
import createButton from "../../report/table/services/modal/utils/createButton.js";

var createTableToOtherAccountedFinancesReports = (otherAccountedFinancesReports) => {
  var table = document.createElement("table");
  table.id = "other-accounted-finances-reports-table";

  var thead = document.createElement("thead");
  var theadRow = document.createElement("tr");

  var theadReportPeriodTitle = "Отчёчный период";
  var theadReportPeriodTh = createThElement(theadReportPeriodTitle);

  var theadFinancesAccountedAtTitle = "Финансы учтены";
  var theadFinancesAccountedAtTh = createThElement(theadFinancesAccountedAtTitle);

  var theadLinkToReportTitle = "Ссылка на отчёт";
  var theadLinkToReportTh = createThElement(theadLinkToReportTitle);

  theadRow.append(theadReportPeriodTh, theadFinancesAccountedAtTh, theadLinkToReportTh);
  thead.append(theadRow);

  var tbody = document.createElement("tbody");

  for (var { dateFrom, dateTo, reportId, financesAccountedAt } of otherAccountedFinancesReports) {
    var tbodyRow = document.createElement("tr");

    var { reportPeriodText } = getReportPeriodText(dateFrom, dateTo);
    var reportPeriodTdElement = createTdElement(reportPeriodText);

    var financesAccountedAtTdElem = createTdElement(financesAccountedAt);

    var a = document.createElement("a");
    a.target = "_blank";
    a.className = "link-to-report";
    a.href = "/report/" + reportId;
    a.textContent = "перейти к отчёту";

    var linkWrapper = document.createElement("div");
    linkWrapper.className = "last-accounted-finances-report-link-wrapper";
    linkWrapper.append(a);

    var linkToReportTdElem = createTdElement(linkWrapper);

    tbodyRow.append(reportPeriodTdElement, financesAccountedAtTdElem, linkToReportTdElem);
    tbody.append(tbodyRow);
  }

  table.append(thead, tbody);
  return table;
};

var createOtherAccountedFinancesReportsModalWindow = (otherAccountedFinancesReports) => {
  var modal = createDiv("modal-overlay");

  var event = "click";
  var cb = () => modal.remove();
  var cancelButtonTextContent = "закрыть";
  var cancelButton = createButton("modal-button modal-button-cancel", cancelButtonTextContent, { event, cb });

  var buttonsContainer = createDiv("modal-buttons");
  buttonsContainer.append(cancelButton);

  var modalContent = createDiv("modal-content");

  var titleContent = "Отчёты с учтёнными финансами";
  var title = createTitle("modal-title", titleContent);

  modalContent.append(title, createTableToOtherAccountedFinancesReports(otherAccountedFinancesReports), buttonsContainer);
  modal.append(modalContent);

  document.body.append(modal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
};

var otherAccountedFinancesReportsModalWindowHandler = (otherAccountedFinancesReports) => {
  var otherAccountedFinancesReportsButton = document.getElementById("other-accounted-finances-reports");

  if (otherAccountedFinancesReports.length) {
    otherAccountedFinancesReportsButton.addEventListener("click", (e) => {
      createOtherAccountedFinancesReportsModalWindow(otherAccountedFinancesReports);
    });
  }
};

export default otherAccountedFinancesReportsModalWindowHandler;
