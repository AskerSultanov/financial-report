import toggleTablesVisibility from "./visibilityToggle/toggleTablesVisibility.js";

var tablesSwitcherHandler = (startYear, endYear) => {
  var startYearTableSwitcher = document.getElementById(startYear);
  var endYearTableSwitcher = document.getElementById(endYear);

  startYearTableSwitcher.addEventListener("click", () => {
    toggleTablesVisibility(endYear, "disable");

    toggleTablesVisibility(startYear, "enable");
  });

  endYearTableSwitcher.addEventListener("click", () => {
    toggleTablesVisibility(startYear, "disable");

    toggleTablesVisibility(endYear, "enable");
  });
};

export default tablesSwitcherHandler;
