import createDiv from "../utils/createDiv.js";
import createTitle from "../utils/createTitle.js";
import createInput from "../utils/createInput.js";
import createButton from "../utils/createButton.js";
import doRequest from "../../../../../utils/doRequest.js";
import getPrevSkuFieldsValue from "../../getPrevSkuFieldsValue.js";
import updateSkusTableFields from "../../updateSkusTableFields.js";
import updateTotalsTableFields from "../../updateTotalsTableFieldsNew.js";
import replaceCommaToDotCallback from "../../replaceCommaToDotCallback.js";
import updateReportFromLocalStorage from "../../updateReportFromLocalStorage.js";
import getChildTablePrevFieldsValue from "../../getChildTablePrevFieldsValue.js";
import updateParentTotalsTableFields from "../../updateParentTotalsTableFields.js";
import updateParentTableExtraAmountField from "../../updateParentTableExtraAmountField.js";

var event = "click";

var saveButtonText = "Сохранить";
var saveButtonClass = "modal-button modal-button-save";

var cancelButtonText = "Отмена";
var cancelButtonClass = "modal-button modal-button-cancel";

var titlesMap = {
  tax: "Добавить налоги к отчету",
  insuranceFee: "Добавить страховые взносы к отчету",
  additionalInsuranceFee: "Добавить доп. страховые взносы к отчету",
};

var createTotalsModal = (dataToUpdate, displayElement, isGuestAccess) => {
  var modal = createDiv("modal-overlay");
  modal.id = "modal-window";

  var modalContent = createDiv("modal-content");

  var titleContent = titlesMap[dataToUpdate.updateField.key];
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

  async function saveButtonHandler() {
    modal.remove();

    var value = +input.value;

    dataToUpdate.updateField.value = value;
    displayElement.textContent = input.value;

    var url = "/" + window.location.pathname.split("/")[1] + "/extra-amounts";

    var res = await doRequest(url, {
      method: "POST",
      body: JSON.stringify(dataToUpdate),
      headers: { "Content-Type": "application/json" },
    });

    var updatedData = await res.json();

    if (updatedData?.errorText) {
      alert(updatedData.errorText);
      return;
    }

    var { years, skusDataToClient, requiredYear, isCrossYearPeriod } =
      updatedData.data;

    skusDataToClient.forEach((sku) => {
      var { prevSkuFieldsValue } = getPrevSkuFieldsValue(sku);

      updateSkusTableFields(sku);

      if (isCrossYearPeriod) {
        var { childTablePrevData } = getChildTablePrevFieldsValue(sku.year);

        updateTotalsTableFields(
          sku.year,
          sku.data,
          prevSkuFieldsValue,
          isCrossYearPeriod,
        );

        updateParentTotalsTableFields(requiredYear, childTablePrevData);
        updateParentTableExtraAmountField(years, dataToUpdate.updateField.key);
      } else {
        updateTotalsTableFields(
          sku.year,
          sku.data,
          prevSkuFieldsValue,
          isCrossYearPeriod,
        );
      }
    });

    if (isGuestAccess) {
      updateReportFromLocalStorage(updatedData.data);
    }
  }

  input.addEventListener("input", replaceCommaToDotCallback);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });
};

export default createTotalsModal;
