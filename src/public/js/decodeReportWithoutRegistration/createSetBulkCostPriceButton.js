import createBulkEditableModal from "./utils/bulkEditableModal/index.js";
import getCheckedCheckboxes from "./utils/checkboxes/getCheckedCheckboxes.js";
import createButton from "./utils/editableSkuFieldModal/utils/createButton.js";

var event = "click";
var updateField = "costPrice";
var text = "Установить себестоимость";
var className = "set-bulk-extra-amounts";

var createSetBulkCostPriceButton = (skus, reportId, isCrossYearPeriod) => {
  var { year } = skus[0];

  var button = createButton(className, text, { event, cb: setBulkCostPrice });
  button.id = "set-bulk-cost-price";

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

export default createSetBulkCostPriceButton;
