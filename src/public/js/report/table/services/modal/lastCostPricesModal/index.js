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

var skusLastCostPriceModal = (years, skusLastCostPrice) => {
  var modal = createDiv("modal-overlay");
  var modalContent = createDiv("modal-content");

  var title = createTitle("modal-title", titleContent);

  var buttonsContainer = createDiv("modal-buttons");

  var cb = async () => {
    var { selectedYear } = getSelectedYear();

    var { selectedLastCostPrices } = getSelectedLastCostPrices(selectedYear);

    console.log({ selectedYear });

    if (!selectedLastCostPrices.length) {
      alert("Для выбранного периода нет последних себестоимостей.");
      return;
    }

    var { skusDataToClient, years, isCrossYearPeriod } = await sendCostPrices(selectedYear, skusLastCostPrice);
    console.log({ isCrossYearPeriod });
    skusDataToClient.forEach((sku) => {
      var { prevSkuFieldsValue } = getPrevSkuFieldsValue(sku);

      updateSkusTableFields(sku, years);
      updateTotalsTableFields(sku.data, years, prevSkuFieldsValue, isCrossYearPeriod);
    });

    document.body.removeChild(modal);
  };

  var saveButton = createButton("modal-button modal-button-save", saveButtonTextContent, { event, cb });

  cb = () => document.body.removeChild(modal);
  var cancelButton = createButton("modal-button modal-button-cancel", cancelButtonTextContent, { event, cb });

  buttonsContainer.append(cancelButton, saveButton);
  modalContent.append(title, createSkusCostPriceContainer(skusLastCostPrice, years), buttonsContainer);
  modal.append(modalContent);
  document.body.append(modal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
};

export default skusLastCostPriceModal;
