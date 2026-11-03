var enableTableContainer = (reportId) => {
  var tablesContainers = document.querySelectorAll("div[tables-container]");

  var requiredContainerId = "tables-container-" + reportId;

  for (var container of tablesContainers) {
    if (container.id === requiredContainerId) {
      container.hidden = false;
    } else {
      container.hidden = true;
    }
  }
};

export { enableTableContainer };
