import getReportPeriodText from "./getReportPeriodText.js";

var enableTablesSwitcher = (dateFrom, dateTo) => {
  var switcher = document.createElement("nav");
  switcher.className = "tabs";
  switcher.ariaLabel = "Переключение таблиц";

  var startYearButton = document.createElement("button");
  var startYear = dateFrom.split("-")[0];
  startYearButton.id = startYear;
  startYearButton.type = "button";
  startYearButton.className = "tab";
  startYearButton.ariaSelected = true;
  var { reportPeriodText } = getReportPeriodText(dateFrom, dateTo, dateFrom);
  startYearButton.textContent = "Отчет " + reportPeriodText;

  var endYearButton = document.createElement("button");
  var endYear = dateTo.split("-")[0];
  endYearButton.id = endYear;
  endYearButton.type = "button";
  endYearButton.className = "tab";
  endYearButton.ariaSelected = false;
  var { reportPeriodText } = getReportPeriodText(dateFrom, dateTo, dateTo);
  endYearButton.textContent = "Отчет " + reportPeriodText;

  switcher.append(startYearButton, endYearButton);

  var tablesContainer = document.getElementById("tables-container");

  tablesContainer.append(switcher);
};

export default enableTablesSwitcher;
