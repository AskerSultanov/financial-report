import toggleTablesVisibility from "./toggleTablesVisibility.js";
import scrollToTablesSwitcher from "./scrollToTablesSwitcher.js";
import { enableActionBar, disableActionBar } from "./toggleActionBar.js";

var bindTabSwitcher = (year, otherYear) => {
  var tab = document.getElementById(year);

  tab.addEventListener("click", () => {
    if (tab.classList.contains("is-active")) {
      return;
    }

    disableActionBar(otherYear);
    toggleTablesVisibility(otherYear, "disable");

    enableActionBar(year);
    toggleTablesVisibility(year, "enable");

    scrollToTablesSwitcher();
  });
};

var tablesSwitcherHandler = (startYear, endYear) => {
  var years = [startYear, endYear];

  for (var year of years) {
    var otherYear = years.find((item) => item !== year);

    bindTabSwitcher(year, otherYear);
  }
};

export default tablesSwitcherHandler;
