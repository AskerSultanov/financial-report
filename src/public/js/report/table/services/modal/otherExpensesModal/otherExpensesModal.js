import createDiv from "../utils/createDiv.js";
import createTitle from "../utils/createTitle.js";
import createInput from "../utils/createInput.js";
import createButton from "../utils/createButton.js";
import sendChangedData from "../../sendChangedData.js";
import getPrevSkuFieldsValue from "../../getPrevSkuFieldsValue.js";
import updateSkusTableFields from "../../updateSkusTableFields.js";
import updateTotalsTableFields from "../../updateTotalsTableFieldsNew.js";
import replaceCommaToDotCallback from "../../replaceCommaToDotCallback.js";
import getChildTablePrevFieldsValue from "../../getChildTablePrevFieldsValue.js";
import updateReportFromLocalStorage from "../../updateReportFromLocalStorage.js";
import updateParentTotalsTableFields from "../../updateParentTotalsTableFields.js";

var event = "click";

var saveButtonText = "Сохранить";
var saveButtonClass = "modal-button modal-button-save";

var cancelButtonText = "Отмена";
var cancelButtonClass = "modal-button modal-button-cancel";

var otherExpensesModal = (dataToUpdate, displayElement, isGuestAccess) => {
  var modal = createDiv("modal-overlay");
  modal.id = "modal-window";

  var modalContent = createDiv("modal-content");

  var titleContent = `Изменить прочие расходы для "${dataToUpdate.skuName}"`;
  var title = createTitle("modal-title", titleContent);

  var input = createInput("modal-input", displayElement);

  var buttonsContainer = createDiv("modal-buttons");

  var saveButton = createButton(saveButtonClass, saveButtonText, {
    event,
    cb: saveButtonHandler,
  });

  var cancelCb = () => modal.remove();
  var cancelButton = createButton(cancelButtonClass, cancelButtonText, {
    event,
    cb: cancelCb,
  });

  buttonsContainer.append(cancelButton, saveButton);
  modalContent.append(title, input, buttonsContainer);
  modal.append(modalContent);
  document.body.append(modal);

  input.focus();

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });

  async function saveButtonHandler() {
    modal.remove();

    dataToUpdate.otherExpenses = +input.value;

    var updatedData = await sendChangedData(
      dataToUpdate,
      isGuestAccess,
      "setotherexpenses",
    );

    if (!updatedData) {
      return;
    }

    displayElement.otherExpensesnt = input.value;

    var { sku, requiredYear, isCrossYearPeriod } = updatedData;
    var { prevSkuFieldsValue } = getPrevSkuFieldsValue(sku);

    updateSkusTableFields(sku, requiredYear);

    if (isCrossYearPeriod) {
      var { childTablePrevData } = getChildTablePrevFieldsValue(sku.year);

      updateTotalsTableFields(
        sku.year,
        sku.data,
        prevSkuFieldsValue,
        isCrossYearPeriod,
      );

      updateParentTotalsTableFields(requiredYear, childTablePrevData);
    } else {
      updateTotalsTableFields(
        sku.year,
        sku.data,
        prevSkuFieldsValue,
        isCrossYearPeriod,
      );
    }

    if (isGuestAccess) {
      updateReportFromLocalStorage(updatedData);
    }
  }

  input.addEventListener("input", replaceCommaToDotCallback);
};

export default otherExpensesModal;
