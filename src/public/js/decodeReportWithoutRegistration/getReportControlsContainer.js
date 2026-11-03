import insertAfter from "./insertAfter.js";

var getReportControlsContainer = () => {
  var container = document.getElementById("report-controls");

  if (container) {
    return container;
  }

  container = document.createElement("div");
  container.id = "report-controls";

  var actions = document.createElement("div");
  actions.id = "report-actions";

  container.append(actions);

  insertAfter(container, document.getElementById("info-blocks-row"));

  var xlsxWrapper = document.getElementById("download-xlsx-wrapper");

  if (xlsxWrapper) {
    actions.append(xlsxWrapper);
  }

  return container;
};

var getReportActionsContainer = () =>
  getReportControlsContainer().querySelector("#report-actions");

export { getReportActionsContainer };
export default getReportControlsContainer;
