import createDiv from "../utils/createDiv.js";
import sendCostPrices from "./sendCostPrices.js";
import createTitle from "../utils/createTitle.js";
import getSelectedYear from "./getSelectedYear.js";
import createButton from "../utils/createButton.js";
import getPrevSkuValues from "../../getPrevSkuFieldsValue.js";
import updateSkusTableFields from "../../updateSkusTableFields.js";
import getSelectedLastCostPrices from "./getSelectedLastCostPrices.js";
import updateTotalsTableFields from "../../updateTotalsTableFieldsNew.js";
import createSkusCostPriceContainer from "./createSkusCostPriceContainer.js";
import updateParentTotalsTableFields from "../../updateParentTotalsTableFields.js";

var event = "click";
var cancelButtonTextContent = "Отмена";
var saveButtonTextContent = "Установить";
var titleContent = `Последние себестоимости для:`;

var skusLastCostPriceModal = (
  skus,
  requiredYear,
  basicReportData,
  lastCostPrices,
) => {
  var modal = createDiv("modal-overlay");
  modal.id = "modal-window";

  var modalContent = createDiv("modal-content");

  var title = createTitle("modal-title", titleContent);

  var buttonsContainer = createDiv("modal-buttons");

  var saveButton = createButton(
    "modal-button modal-button-save",
    saveButtonTextContent,
    { event, cb: saveButtonHandler },
  );

  var cancelButton = createButton(
    "modal-button modal-button-cancel",
    cancelButtonTextContent,
    { event, cb: () => modal?.remove() },
  );

  var skusCostPriceContainer = createSkusCostPriceContainer(
    lastCostPrices,
    requiredYear,
  );

  buttonsContainer.append(cancelButton, saveButton);
  modalContent.append(title, skusCostPriceContainer, buttonsContainer);

  modal.append(modalContent);
  document.body.append(modal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal?.remove();
    }
  });

  async function saveButtonHandler() {
    var { selectedYear } = getSelectedYear();

    var { selectedLastCostPrices } = getSelectedLastCostPrices(selectedYear);

    if (!selectedLastCostPrices.length) {
      alert("Для выбранного периода нет последних себестоимостей.");
      return;
    }

    var { updatedSkus } = await sendCostPrices(
      selectedYear,
      basicReportData,
      lastCostPrices,
    );

    for (var updatedSku of updatedSkus) {
      var { year, skuName, data } = updatedSku;

      var skuBeforeUpdation = skus.find(
        (sku) => sku.skuName === skuName && sku.year === year,
      );

      if (!skuBeforeUpdation) {
        continue;
      }

      var { prevSkuFieldsValue } = getPrevSkuValues(
        year,
        skuName,
        skuBeforeUpdation,
      );

      data.qty = skuBeforeUpdation.qty;
      updateSkusTableFields(year, skuName, data);

      updateTotalsTableFields(
        year,
        data,
        prevSkuFieldsValue,
        basicReportData.isCrossYearPeriod,
      );

      if (basicReportData.isCrossYearPeriod) {
        updateParentTotalsTableFields(year, reportId);
      }
    }

    modal?.remove();
  }
};

export default skusLastCostPriceModal;
