import { enableActionBar } from "./toggleActionBar.js";
import toggleTablesVisibility from "./visibilityToggle/toggleTablesVisibility.js";

var switchToFirstTable = (year) => {
  enableActionBar(year);
  toggleTablesVisibility(year, "enable");

  var nextYear = year + 1;
  toggleTablesVisibility(nextYear, "disable");
};

export default switchToFirstTable;
