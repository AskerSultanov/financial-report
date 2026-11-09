import { enableActionBar, disableActionBar } from "./toggleActionBar.js";
import toggleTablesVisibility from "./visibilityToggle/toggleTablesVisibility.js";

var tablesSwitcherHandler = (startYear, endYear) => {
  var startYearTableSwitcher = document.getElementById(startYear);
  var endYearTableSwitcher = document.getElementById(endYear);

  startYearTableSwitcher.addEventListener("click", () => {
    disableActionBar(endYear);
    toggleTablesVisibility(endYear, "disable");

    enableActionBar(startYear);
    toggleTablesVisibility(startYear, "enable");
  });

  endYearTableSwitcher.addEventListener("click", () => {
    disableActionBar(startYear);
    toggleTablesVisibility(startYear, "disable");

    enableActionBar(endYear)
    toggleTablesVisibility(endYear, "enable");
  });
};

export default tablesSwitcherHandler;
