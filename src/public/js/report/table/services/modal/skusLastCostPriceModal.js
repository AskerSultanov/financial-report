import createDiv from "./utils/createDiv.js";
import createTitle from "./utils/createTitle.js";
import sendCostPrices from "./sendCostPrices.js";
import createButton from "./utils/createButton.js";
import updateSKUsTableFields from "../updateSKUsTableFields.js";
import updateTotalsTableFields from "../updateTotalsTableFields.js";
import financialAccountingStatusButtonHander from "../../../financialAccountingStatusButtonHander.js";

var getSkusCostPriceContainer = (skusCostPrice) => {
  var container = createDiv("last-cost-prices-modal");

  var list = createDiv("last-cost-prices-modal__list");

  skusCostPrice.forEach((sku) => {
    var item = createDiv("last-cost-prices-modal__item");

    var name = createDiv("last-cost-prices-modal__name", sku.skuName);

    var costPrice = createDiv("last-cost-prices-modal__price", sku.lastCostPrice);
    item.appendChild(name);
    item.appendChild(costPrice);
    list.appendChild(item);
  });

  container.appendChild(list);
  return container;
};

var skusLastCostPriceModal = (reportId, taxYear, skusLastCostPrice) => {
  var modal = createDiv("modal-overlay");
  var modalContent = createDiv("modal-content");

  var titleContent = `Последние себестоимости для:`;
  var title = createTitle("modal-title", titleContent);

  var buttonsContainer = createDiv("modal-buttons");

  var saveButtonTextContent = "Установить";
  var event = "click";
  var cb = async () => {
    var userId = document.cookie.split("=")[1];

    var { skusDataToClient, totals, years } = await sendCostPrices(userId, reportId, taxYear, skusLastCostPrice);

    updateTotalsTableFields(totals, years);
    financialAccountingStatusButtonHander(userId, reportId);

    skusDataToClient.map((sku) => updateSKUsTableFields(sku, years));

    document.body.removeChild(modal);
  };
  var saveButton = createButton("modal-button modal-button-save", saveButtonTextContent, { event, cb });

  cb = () => document.body.removeChild(modal);
  var cancelButtonTextContent = "Отмена";
  var cancelButton = createButton("modal-button modal-button-cancel", cancelButtonTextContent, { event, cb });

  buttonsContainer.append(cancelButton, saveButton);
  modalContent.append(title, getSkusCostPriceContainer(skusLastCostPrice), buttonsContainer);
  modal.append(modalContent);
  document.body.append(modal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
};

export default skusLastCostPriceModal;
