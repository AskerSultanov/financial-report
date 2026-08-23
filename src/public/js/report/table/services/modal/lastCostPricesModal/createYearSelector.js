import createDiv from "../utils/createDiv.js";
import getSelectedYear from "./getSelectedYear.js";
import createCostPricesListItem from "./createCostPricesListItem.js";
import getSkuNamesFromSelectedYearSkusTable from "./getSkuNamesFromSelectedYearSkusTable.js";

var createYearSelector = (years, costPrices) => {
  var yearSelector = document.createElement("select");
  yearSelector.id = "year-selector";

  yearSelector.onchange = () => {
    var list = createDiv("last-cost-prices-modal__list");
    list.id = "last-cost-price-list";

    var listContainer = document.getElementById("last-cost-prices-container");

    var { selectedYear } = getSelectedYear();

    var { skusNameFromSelectedSkusTable } = getSkuNamesFromSelectedYearSkusTable(selectedYear);

    for (var skuNameFromTable of skusNameFromSelectedSkusTable) {
      var existSkuInSelectedYear = costPrices.find((item) => item.skuName === skuNameFromTable);

      if (existSkuInSelectedYear) {
        var { item } = createCostPricesListItem(existSkuInSelectedYear);
        list.append(item);
      }
    }

    var prevList = document.getElementById("last-cost-price-list");
    prevList?.remove();

    listContainer.append(list);
  };

  for (var year of years) {
    var option = document.createElement("option");
    option.value = year;
    option.textContent = year;

    yearSelector.append(option);
  }

  var yearSelectorLabel = document.createElement("label");
  yearSelectorLabel.textContent = "Установить цены за год";

  var yearSelectorContainer = createDiv();
  yearSelectorContainer.append(yearSelectorLabel, yearSelector);

  return yearSelectorContainer;
};

export default createYearSelector;
