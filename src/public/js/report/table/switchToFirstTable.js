import toggleTablesVisibility from "./visibilityToggle/toggleTablesVisibility.js";

var switchToFirstTable = (year) => {
  toggleTablesVisibility(year, "enable");
  toggleTablesVisibility(year + 1, "disable");
};

export default switchToFirstTable;
