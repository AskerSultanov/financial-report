import hideAllInYearsContainer from "./hideAllInYearsContainer.js";
import openLastYearAndMonthDetails from "../reportTreeBuilder/createReportTree/openLastYearAndMonthDetails.js";

var switchYearSelectorToRequiredYear = (year) => {
  var yearSelector = document.getElementById("year_selector");
  var yearsContainer = document.getElementById("years_container");

  if (yearsContainer.children.length) {
    var optionId = "option_" + year;
    var option = document.getElementById(optionId);

    hideAllInYearsContainer();
    var yearDetails = document.getElementById(year);
    yearDetails.open = true;
    yearDetails.hidden = false;

    if (option) {
      option.selected = true;
      openLastYearAndMonthDetails(year);
    } else {
      var newOption = document.createElement("option");
      newOption.value = year;
      newOption.textContent = year;
      newOption.id = "option_" + year;

      yearSelector.append(newOption);
    }
  }
};

export default switchYearSelectorToRequiredYear;
