import createDiv from "../editableSkuFieldModal/utils/createDiv.js";
import createTitle from "../editableSkuFieldModal/utils/createTitle.js";
import createButton from "../editableSkuFieldModal/utils/createButton.js";

import calcUtils from "../calcUtils/index.js";
import getPrevSkuValues from "../editableSkuFieldModal/getPrevSkuValues.js";
import updateSkusTableFields from "../editableSkuFieldModal/updateSkusTableFields.js";
import updateTotalsTableFields from "../editableSkuFieldModal/updateTotalsTableFields.js";
import replaceCommaToDotCallback from "../editableSkuFieldModal/replaceCommaToDotCallback.js";
import updateParentTotalsTableFields from "../editableSkuFieldModal/updateParentTotalsTableFields.js";
import bulkUpdatedReportFromLocalStorage from "./bulkUpdatedReportFromLocalStorage.js";

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
    var updatedSkus = [];

    var newValue = +input.value;

    for (var skuToUpdate of skus) {
      var isEqual = newValue === skuToUpdate[updateField];
      var hasNoSales = skuToUpdate.profit === 0 || skuToUpdate.qty === 0;

      if (isEqual || hasNoSales) {
        continue;
      }

      var { year, skuName } = skuToUpdate;

      var skuBeforeUpdation = { ...skuToUpdate };

      var { prevSkuFieldsValues } = getPrevSkuValues(
        year,
        skuName,
        skuBeforeUpdation,
      );

      skuToUpdate[updateField] = newValue;

      var { updatedSku } = calcUtils.sku.restParams(skuToUpdate);

      updatedSkus.push({ skuName, year, updatedSku });

      var displayElementId = `${updateField}-${skuName}-${reportId}-${year}`;
      var displayElement = document.getElementById(displayElementId);
      displayElement.textContent = newValue;

      updateSkusTableFields(year, skuName, updatedSku);

      updateTotalsTableFields(
        year,
        updatedSku,
        prevSkuFieldsValues,
        isCrossYearPeriod,
      );

      if (isCrossYearPeriod) {
        updateParentTotalsTableFields(year, reportId);
      }
    }

    modal.remove();

    bulkUpdatedReportFromLocalStorage(reportId, updatedSkus);
  }

  input.addEventListener("input", replaceCommaToDotCallback);
};

export default createBulkEditableModal;
