import buildReportBlock from "./buildReportBlock.js";
import getReportPeriodText from "./getReportPeriodText.js";
import getReportFromLocalStorage from "./getReportFromLocalStorage.js";
import getReportControlsContainer from "./getReportControlsContainer.js";

var createReportSelector = (reports) => {
  var label = document.createElement("label");
  label.textContent = "Выбрать отчет";

  var selector = document.createElement("select");
  selector.id = "selector";

  selector.addEventListener("change", () => {
    for (var option of selector.children) {
      if (option.selected) {
        var reportId = option.value;

        var { report } = getReportFromLocalStorage(reportId);

        buildReportBlock(report);
      }
    }
  });

  for (var { dateFrom, dateTo, reportId } of reports) {
    var option = document.createElement("option");

    var { reportPeriodText } = getReportPeriodText(dateFrom, dateTo);

    option.value = reportId;
    option.textContent = reportPeriodText;

    selector.append(option);
  }

  var selectorContainer = document.createElement("div");
  selectorContainer.id = "selector-container";
  selectorContainer.append(label, selector);

  // Селектор — левый полюс панели (контекст), действия живут в #report-actions
  getReportControlsContainer().prepend(selectorContainer);
};

export default createReportSelector;
