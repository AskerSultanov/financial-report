import createDiv from "../utils/createDiv.js";
import createTitle from "../utils/createTitle.js";
import createInput from "../utils/createInput.js";
import createButton from "../utils/createButton.js";
import sendChangedData from "../../sendChangedData.js";
import getPrevSkuFieldsValue from "../../getPrevSkuFieldsValue.js";
import updateSkusTableFields from "../../updateSkusTableFields.js";
import updateTotalsTableFields from "../../updateTotalsTableFields.js";
import updateReportFromLocalStorage from "../../updateReportFromLocalStorage.js";

var otherExpensesModal = (skuData, otherExpensesDisplayElement, isGuestAccess) => {
  var modal = createDiv("modal-overlay");
  var modalContent = createDiv("modal-content");

  var titleContent = `Изменить прочие расходы для "${skuData.skuName}"`;
  var title = createTitle("modal-title", titleContent);

  var otherExpensesInput = createInput("modal-input", otherExpensesDisplayElement);

  var buttonsContainer = createDiv("modal-buttons");

  var saveButtonTextContent = "Сохранить";
  var event = "click";
  var cb = async () => {
    document.body.removeChild(modal);

    skuData.otherExpenses = +otherExpensesInput.value;

    var data = await sendChangedData(skuData, isGuestAccess, "setotherexpenses");

    if (!data) {
      return;
    }

    otherExpensesDisplayElement.otherExpensesnt = otherExpensesInput.value;

    var { sku, years, isCrossYearPeriod } = data;
    var { prevSkuFieldsValue } = getPrevSkuFieldsValue(sku);

    updateSkusTableFields(sku, years);
    updateTotalsTableFields(sku.data, years, prevSkuFieldsValue, isCrossYearPeriod);

    if (isGuestAccess) {
      updateReportFromLocalStorage(data);
    }
  };

  var saveButton = createButton("modal-button modal-button-save", saveButtonTextContent, { event, cb });

  cb = () => document.body.removeChild(modal);
  var cancelButtonTextContent = "Отмена";
  var cancelButton = createButton("modal-button modal-button-cancel", cancelButtonTextContent, { event, cb });

  buttonsContainer.append(cancelButton, saveButton);
  modalContent.append(title, otherExpensesInput, buttonsContainer);
  modal.append(modalContent);
  document.body.append(modal);

  otherExpensesInput.focus();

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
};

export default otherExpensesModal;
