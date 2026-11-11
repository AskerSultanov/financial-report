import hideAllInYearsContainer from "./hideAllInYearsContainer.js";
import createOptionToYearSelector from "./createOptionToYearSelector.js";
import inserAfter from "../../decodeReportWithoutRegistration/insertAfter.js";
import openLastYearAndMonthDetails from "../reportTreeBuilder/createReportTree/openLastYearAndMonthDetails.js";

var yearsContainer = document.getElementById("years_container");

var bootstrapYearSelector = (reportTree = []) => {
  var selector = document.getElementById("year_selector");

  if (selector) {
    return selector;
  }

  var label = document.createElement("label");
  label.textContent = "Выбрать отчетый год";

  var selector = document.createElement("select");
  selector.id = "year_selector";

  selector.addEventListener("change", () => {
    for (var option of selector.children) {
      if (option.selected) {
        var year = option.value;

        hideAllInYearsContainer();
        openLastYearAndMonthDetails(year);
      }
    }
  });

  for (var { year } of reportTree) {
    var { option, isExist } = createOptionToYearSelector(year);

    if (!isExist) {
      selector.append(option);
    }
  }

  var selectorContainer = document.createElement("div");
  selectorContainer.id = "year_selector_container";
  selectorContainer.append(label, selector);

  document.body.append(selectorContainer);

  inserAfter(yearsContainer, selectorContainer);

  return selector;
};

export default bootstrapYearSelector;
