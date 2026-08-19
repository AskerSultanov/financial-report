import createDiv from "./utils/createDiv.js";
import createTitle from "./utils/createTitle.js";
import createInput from "./utils/createInput.js";
import createButton from "./utils/createButton.js";
import sendChangedData from "../sendChangedData.js";
import updateSKUsTableFields from "../updateSKUsTableFields.js";
import updateTotalsTableFields from "../updateTotalsTableFields.js";
import updateReportFromLocalStorage from "../updateReportFromLocalStorage.js";
import getReportDataFromLocalStorage from "./getReportDataFromLocalStorage.js";
import financialAccountingStatusButtonHander from "../../../financialAccountingStatusButtonHander.js";

var event = "click";

var costPriceModal = (skuData, costPriceDisplayElement, isGuestAccess, postfix) => {
  var modal = createDiv("modal-overlay");
  var modalContent = createDiv("modal-content");

  var titleContent = `Изменить себестоимость для "${skuData.skuName}"`;
  var title = createTitle("modal-title", titleContent);

  var costPriceInput = createInput("modal-input", costPriceDisplayElement);

  var buttonsContainer = createDiv("modal-buttons");

  var saveButtonTextContent = "Сохранить";

  var saveCb = async () => {
    document.body.removeChild(modal);

    skuData["costPrice" + postfix] = +costPriceInput.value;

    if (isGuestAccess) {
      var reportData = getReportDataFromLocalStorage(skuData);
      skuData = Object.assign(skuData, reportData);
    }

    var data = await sendChangedData(skuData, isGuestAccess, "setcostprice");
    console.log({ data });
    if (!data) {
      return;
    }

    costPriceDisplayElement.textContent = costPriceInput.value;

    var { sku, totals, years } = data;
    updateSKUsTableFields(sku, years);
    updateTotalsTableFields(totals, years);

    if (isGuestAccess) {
      updateReportFromLocalStorage(data);
    } else {
      financialAccountingStatusButtonHander(skuData.userId, skuData.reportId);
    }
  };

  var saveButton = createButton("modal-button modal-button-save", saveButtonTextContent, { event, cb: saveCb });

  var cancelButtonTextContent = "Отмена";
  var cancelCb = () => document.body.removeChild(modal);
  var cancelButton = createButton("modal-button modal-button-cancel", cancelButtonTextContent, { event, cb: cancelCb });

  buttonsContainer.append(cancelButton, saveButton);
  modalContent.append(title, costPriceInput, buttonsContainer);
  modal.append(modalContent);
  document.body.append(modal);

  costPriceInput.focus();

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
};

export default costPriceModal;
