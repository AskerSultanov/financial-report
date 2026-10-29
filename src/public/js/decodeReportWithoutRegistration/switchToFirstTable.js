import toggleTablesVisibility from "./toggleTablesVisibility.js";

var switchToFirstTable = (year) => {
  toggleTablesVisibility(year, "enable");

  var nextYear = year + 1;
  
  toggleTablesVisibility(nextYear, "disable");
};

export default switchToFirstTable;
