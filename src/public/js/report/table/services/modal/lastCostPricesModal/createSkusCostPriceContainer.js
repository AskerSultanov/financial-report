import createDiv from "../utils/createDiv.js";
import allYearsIsEqual from "./allYearsIsEqual.js";
import createYearSelector from "./createYearSelector.js";
import createCostPricesListItem from "./createCostPricesListItem.js";
import getSkuNamesFromSelectedYearSkusTable from "./getSkuNamesFromSelectedYearSkusTable.js";

var createSkusCostPriceContainer = (skusCostPrice, years) => {
  var container = createDiv("last-cost-prices-modal");
  container.id = "last-cost-prices-container";

  var list = createDiv("last-cost-prices-modal__list");
  list.id = "last-cost-price-list";

  if (!allYearsIsEqual(years)) {
    var firstYear = years[0];

    var { skusNameFromSelectedSkusTable } = getSkuNamesFromSelectedYearSkusTable(firstYear);

    for (var skuNameFromTable of skusNameFromSelectedSkusTable) {
      var existSkuInSelectedYear = skusCostPrice.find((item) => item.skuName === skuNameFromTable);

      if (existSkuInSelectedYear) {
        var { item } = createCostPricesListItem(existSkuInSelectedYear);
        list.append(item);
      }
    }
  } else {
    skusCostPrice.forEach((sku) => {
      var { item } = createCostPricesListItem(sku);

      list.append(item);
    });
  }

  var yearSelector = createYearSelector(years, skusCostPrice);

  container.append(yearSelector);
  container.append(list);

  return container;
};

export default createSkusCostPriceContainer;
