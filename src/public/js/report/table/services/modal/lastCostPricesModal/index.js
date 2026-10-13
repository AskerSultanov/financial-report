import createDiv from "../utils/createDiv.js";
import sendCostPrices from "./sendCostPrices.js";
import createTitle from "../utils/createTitle.js";
import getSelectedYear from "./getSelectedYear.js";
import createButton from "../utils/createButton.js";
import getPrevSkuFieldsValue from "../../getPrevSkuFieldsValue.js";
import updateSkusTableFields from "../../updateSkusTableFields.js";
import updateTotalsTableFields from "../../updateTotalsTableFields.js";
import getSelectedLastCostPrices from "./getSelectedLastCostPrices.js";
import createSkusCostPriceContainer from "./createSkusCostPriceContainer.js";

var event = "click";
var cancelButtonTextContent = "Отмена";
var saveButtonTextContent = "Установить";
var titleContent = `Последние себестоимости для:`;

var skusLastCostPriceModal = (requiredYear, skusLastCostPrice) => {
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
    { event, cb: cancelButtonHandler },
  );

  var skusCostPriceContainer = createSkusCostPriceContainer(
    skusLastCostPrice,
    requiredYear,
  );

  buttonsContainer.append(cancelButton, saveButton);
  modalContent.append(title, skusCostPriceContainer, buttonsContainer);

  modal.append(modalContent);
  document.body.append(modal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });

  async function saveButtonHandler() {
    var { selectedYear } = getSelectedYear();

    var { selectedLastCostPrices } = getSelectedLastCostPrices(selectedYear);

    if (!selectedLastCostPrices.length) {
      alert("Для выбранного периода нет последних себестоимостей.");
      return;
    }

    var { skusDataToClient, requiredYear, isCrossYearPeriod } =
      await sendCostPrices(selectedYear, skusLastCostPrice);

    skusDataToClient.forEach((sku) => {
      var { prevSkuFieldsValue } = getPrevSkuFieldsValue(sku);

      updateSkusTableFields(sku, requiredYear);
      updateTotalsTableFields(
        sku.data,
        requiredYear,
        prevSkuFieldsValue,
        isCrossYearPeriod,
      );
    });

    document.body.removeChild(modal);
  }

  function cancelButtonHandler() {
    document.body.removeChild(modal);
  }
};

export default skusLastCostPriceModal;
