import createDiv from "./utils/createDiv.js";
import createTitle from "./utils/createTitle.js";
import createInput from "./utils/createInput.js";
import createButton from "./utils/createButton.js";

import calcUtils from "../calcUtils/index.js";
import getPrevSkuValues from "./getPrevSkuValues.js";
import updateSkusTableFields from "./updateSkusTableFields.js";
import updateTotalsTableFields from "./updateTotalsTableFields.js";
import replaceCommaToDotCallback from "./replaceCommaToDotCallback.js";
import getChildTablePrevFieldsValue from "./getChildTablePrevFieldsValue.js";
import updateReportFromLocalStorage from "./updateReportFromLocalStorage.js";
import updateParentTotalsTableFields from "./updateParentTotalsTableFields.js";

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
  skuToUpdate,
  updateField,
  displayElement,
) => {
  var modal = createDiv("modal-overlay");
  modal.id = "modal-window";

  var modalContent = createDiv("modal-content");

  var titleStartPart = titlesStartPartMap[updateField];
  var titleContent = titleStartPart + skuToUpdate.skuName;
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

    var isEqual = newValue === skuToUpdate[updateField];

    if (isEqual) {
      alert(equalValuesMsg);
      return;
    }

    modal.remove();

    var { year, skuName, reportId, isCrossYearPeriod } = skuToUpdate;

    var skuBeforeUpdation = { ...skuToUpdate };

    var { prevSkuFieldsValues } = getPrevSkuValues(
      year,
      skuName,
      skuBeforeUpdation,
    );

    skuToUpdate[updateField] = newValue;
    displayElement.textContent = newValue;

    var { updatedSku } = calcUtils.sku.restParams(skuToUpdate);
    updateReportFromLocalStorage(year, skuName, reportId, updatedSku);

    updateSkusTableFields(year, skuName, updatedSku);

    if (isCrossYearPeriod) {
      var { childTablePrevData } = getChildTablePrevFieldsValue(year);

      updateTotalsTableFields(
        year,
        updatedSku,
        prevSkuFieldsValues,
        isCrossYearPeriod,
      );

      updateParentTotalsTableFields(year, childTablePrevData);
    } else {
      updateTotalsTableFields(
        year,
        updatedSku,
        prevSkuFieldsValues,
        isCrossYearPeriod,
      );
    }
  }

  input.addEventListener("input", replaceCommaToDotCallback);
};

export default createEditableSkuFieldModal;
