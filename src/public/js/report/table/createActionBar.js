import createSkuSelectorButton from "./createSkuSelectorButton.js";
import createSetBulkCostPriceButton from "./createSetBulkCostPriceButton.js";
import getCheckedCheckboxes from "./services/checkboxes/getCheckedCheckboxes.js";
import createSetBulkOtherExpensesButton from "./createSetBulkOtherExpensesButton.js";

var createActionBar = (
  skus,
  userId,
  reportId,
  isCrossYearPeriod,
  skusTableScrollElem,
) => {
  var { year } = skus[0];

  var actionBar = document.createElement("div");
  actionBar.hidden = true;
  actionBar.className = "action-bar";
  actionBar.id = "action-bar-" + year;
  actionBar.setAttribute("role", "toolbar");
  actionBar.setAttribute("aria-label", "Действия с таблицей SKU");

  var leftZone = document.createElement("div");
  leftZone.className = "action-bar__zone action-bar__zone--left";

  var rightZone = document.createElement("div");
  rightZone.className = "action-bar__zone action-bar__zone--right";

  var setBulkCostPriceButton = createSetBulkCostPriceButton(
    skus,
    userId,
    reportId,
    isCrossYearPeriod,
  );

  var setBulkOtherExpensesButton = createSetBulkOtherExpensesButton(
    skus,
    userId,
    reportId,
    isCrossYearPeriod,
  );

  var bulkButtons = [setBulkCostPriceButton, setBulkOtherExpensesButton];

  for (var bulkButton of bulkButtons) {
    bulkButton.type = "button";
  }

  setBulkCostPriceButton.title = "Установить себестоимость для выбранных SKU";
  setBulkOtherExpensesButton.title =
    "Установить прочие расходы для выбранных SKU";

  var skuSelectorButton = createSkuSelectorButton(skus, bulkButtons);

  skuSelectorButton.setAttribute("aria-controls", "skus-table-" + year);

  hideBulkButtons();

  leftZone.append(skuSelectorButton);
  rightZone.append(...bulkButtons);
  actionBar.append(leftZone, rightZone);

  skusTableScrollElem?.addEventListener("change", (e) => {
    if (e.target.matches('input[type="checkbox"]')) {
      syncBulkButtonsState();
    }
  });

  return { actionBar };

  function hideBulkButtons() {
    for (var button of bulkButtons) {
      button.hidden = true;
      button.disabled = true;
    }
  }

  function syncBulkButtonsState() {
    var { checkedCheckboxes } = getCheckedCheckboxes(year);
    var isDisabled = checkedCheckboxes.length === 0;

    for (var button of bulkButtons) {
      button.disabled = isDisabled;
    }
  }
};

export default createActionBar;
