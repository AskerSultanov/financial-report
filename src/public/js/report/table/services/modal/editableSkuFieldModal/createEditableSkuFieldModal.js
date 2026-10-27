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
import updateParentTotalsTableFields from "../../updateParentTotalsTableFields.js";

var event = "click";

var saveButtonTextContent = "Сохранить";
var saveButtonClass = "modal-button modal-button-save";

var cancelButtonText = "Отмена";
var cancelButtonClass = "modal-button modal-button-cancel";

var titlesStartPartMap = {
  costPrice: "Изменить себестоимость для ",
  otherExpenses: "Изменить прочие расходы для ",
};

var equalValuesMsg = "Значение совпадает с предыдущим";

var createEditableSkuFieldModal = (
  skuFromTable,
  updateField,
  displayElement,
) => {
  var modal = createDiv("modal-overlay");
  modal.id = "modal-window";

  var modalContent = createDiv("modal-content");

  var titleStartPart = titlesStartPartMap[updateField];
  var titleContent = titleStartPart + skuFromTable.skuName;
  var title = createTitle("modal-title", titleContent);

  var input = createInput("modal-input", displayElement);

  var buttonsContainer = createDiv("modal-buttons");

  var saveButton = createButton(saveButtonClass, saveButtonTextContent, {
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
    if (e.target === modal) modal.remove();
  });

  async function saveButtonHandler() {
    var newValue = +input.value;

    var isEqual = newValue === skuFromTable[updateField];

    if (isEqual) {
      alert(equalValuesMsg);
      return;
    }

    modal.remove();

    var { year, userId, reportId, skuName, costPrice, otherExpenses } =
      skuFromTable;

    var dataToUpdate = {
      year,
      userId,
      skuName,
      reportId,
      costPrice,
      otherExpenses,
    };

    dataToUpdate[updateField] = newValue;

    var updatedData = await sendChangedData(dataToUpdate, updateField);

    if (!updatedData) {
      return;
    }

    var { updatedSku, isCrossYearPeriod } = updatedData;
    var { prevSkuFieldsValue } = getPrevSkuFieldsValue(
      year,
      skuName,
      updatedSku,
    );

    updatedSku.qty = skuFromTable.qty;

    updateSkusTableFields(year, skuName, updatedSku);
    displayElement.textContent = newValue;

    if (isCrossYearPeriod) {
      var { childTablePrevData } = getChildTablePrevFieldsValue(year);

      updateTotalsTableFields(
        year,
        updatedSku,
        prevSkuFieldsValue,
        isCrossYearPeriod,
      );

      updateParentTotalsTableFields(year, childTablePrevData);
    } else {
      updateTotalsTableFields(
        year,
        updatedSku,
        prevSkuFieldsValue,
        isCrossYearPeriod,
      );
    }
  }

  input.addEventListener("input", replaceCommaToDotCallback);
};

export default createEditableSkuFieldModal;
