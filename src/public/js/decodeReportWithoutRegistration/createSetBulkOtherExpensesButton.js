import createBulkEditableModal from "./utils/bulkEditableModal/index.js";
import getCheckedCheckboxes from "./utils/checkboxes/getCheckedCheckboxes.js";
import createButton from "./utils/editableSkuFieldModal/utils/createButton.js";

var event = "click";
var updateField = "otherExpenses";
var text = "Установить прочие расходы";
var className = "set-bulk-extra-amounts";

var createSetBulkOtherExpensesButton = (skus, reportId, isCrossYearPeriod) => {
  var { year } = skus[0];

  var button = createButton(className, text, { event, cb: setBulkCostPrice });
  button.id = "set-bulk-other-expenses";

  return button;

  function setBulkCostPrice() {
    var { checkedCheckboxes } = getCheckedCheckboxes(year);

    if (!checkedCheckboxes.length) {
      return;
    }

    var skuNames = checkedCheckboxes.map((item) =>
      item.getAttribute("skuname"),
    );

    var filteredSkus = [];

    for (var sku of skus) {
      var existSku = skuNames.find((skuName) => skuName === sku.skuName);

      if (existSku) {
        filteredSkus.push(sku);
      }
    }

    var hasActiveModal = document.getElementById("modal-window");

    if (!hasActiveModal) {
      createBulkEditableModal(
        filteredSkus,
        reportId,
        updateField,
        isCrossYearPeriod,
      );
    }
  }
};

export default createSetBulkOtherExpensesButton;
