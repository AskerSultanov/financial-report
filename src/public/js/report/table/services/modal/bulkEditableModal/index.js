import createDiv from "../utils/createDiv.js";
import createTitle from "../utils/createTitle.js";
import createButton from "../utils/createButton.js";

import sendBulkEditableData from "./sendBulkEditableData.js";
import getPrevSkuValues from "../../getPrevSkuFieldsValue.js";
import updateSkusTableFields from "../../updateSkusTableFields.js";
import updateTotalsTableFields from "../../updateTotalsTableFieldsNew.js";
import replaceCommaToDotCallback from "../../replaceCommaToDotCallback.js";
import updateParentTotalsTableFields from "../../updateParentTotalsTableFields.js";

var event = "click";

var saveButtonTextContent = "Сохранить";
var saveButtonClass = "modal-button modal-button-save";

var cancelButtonText = "Отмена";
var cancelButtonClass = "modal-button modal-button-cancel";

var titlesStartPartMap = {
  costPrice: "Изменить 'себестоимость' для ",
  otherExpenses: "Изменить 'прочие расходы' для ",
};

var createBulkEditableModal = (
  skus,
  userId,
  reportId,
  updateField,
  isCrossYearPeriod,
) => {
  var modal = createDiv("modal-overlay");
  modal.id = "modal-window";

  var modalContent = createDiv("modal-content");

  var titleStartPart = titlesStartPartMap[updateField];
  var fullTitle = titleStartPart + skus.length + " sku";
  var title = createTitle("modal-title", fullTitle);

  var input = document.createElement("input");
  input.type = "text";
  input.className = "modal-input";

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
    var skusToUpdate = [];

    var newValue = +input.value;

    for (var skuToUpdate of skus) {
      var isEqual = newValue === skuToUpdate[updateField];

      if (isEqual) {
        continue;
      }

      var { year, skuName } = skuToUpdate;
      skusToUpdate.push({ year, skuName });
    }

    var { updatedSkus } = await sendBulkEditableData(
      userId,
      reportId,
      updateField,
      newValue,
      skusToUpdate,
    );

    modal.remove();

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

      var displayElementId = `${updateField}-${skuName}-${year}`;
      var displayElement = document.getElementById(displayElementId);
      displayElement.textContent = newValue;

      data.qty = skuBeforeUpdation.qty;
      updateSkusTableFields(year, skuName, data);

      updateTotalsTableFields(
        year,
        data,
        prevSkuFieldsValue,
        isCrossYearPeriod,
      );

      if (isCrossYearPeriod) {
        updateParentTotalsTableFields(year, reportId);
      }
    }
  }

  input.addEventListener("input", replaceCommaToDotCallback);
};

export default createBulkEditableModal;
