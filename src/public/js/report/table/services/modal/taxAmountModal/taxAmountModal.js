import createDiv from "../utils/createDiv.js";
import createTitle from "../utils/createTitle.js";
import createInput from "../utils/createInput.js";
import createButton from "../utils/createButton.js";
import getPrevSkuFieldsValue from "../../getPrevSkuFieldsValue.js";
import updateSkusTableFields from "../../updateSkusTableFields.js";
import updateTotalsTableFields from "../../updateTotalsTableFields.js";
import updateReportFromLocalStorage from "../../updateReportFromLocalStorage.js";

var event = "click";

var taxAmountModal = (newTaxData, taxAmountDisplayElement, isGuestAccess) => {
  var modal = createDiv("modal-overlay");
  modal.id = "modal-window";

  var modalContent = createDiv("modal-content");

  var titleContent = `Добавить налоги к отчету`;
  var title = createTitle("modal-title", titleContent);

  var taxInput = createInput("modal-input", taxAmountDisplayElement);

  var buttonsContainer = createDiv("modal-buttons");

  var saveButtonTextContent = "Сохранить";

  var saveButton = createButton(
    "modal-button modal-button-save",
    saveButtonTextContent,
    {
      event,
      cb: saveButtonHandler,
    },
  );

  var cancelButtonTextContent = "Отмена";
  var cancelCb = () => document.body.removeChild(modal);
  var cancelButton = createButton(
    "modal-button modal-button-cancel",
    cancelButtonTextContent,
    {
      event,
      cb: cancelCb,
    },
  );

  buttonsContainer.append(cancelButton, saveButton);
  modalContent.append(title, taxInput, buttonsContainer);
  modal.append(modalContent);
  document.body.append(modal);

  taxInput.focus();

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });

  async function saveButtonHandler() {
    document.body.removeChild(modal);

    newTaxData.newTax = +taxInput.value;

    taxAmountDisplayElement.textContent = taxInput.value;

    return;
    var res = await fetch("/report/tax-amount", {
      method: "POST",
      body: JSON.stringify(newTaxData),
      headers: { "Content-Type": "application/json" },
    });

    var json = await res.json();

    if (json?.errorText) {
      alert(json.errorText);
      return;
    }

    if (json?.infoText) {
      alert(json.infoText);
      return;
    }

    var { sku, years, isCrossYearPeriod } = json.data;
    var { prevSkuFieldsValue } = getPrevSkuFieldsValue(sku);

    updateSkusTableFields(sku);

    updateTotalsTableFields(
      sku.data,
      years,
      prevSkuFieldsValue,
      isCrossYearPeriod,
    );

    if (isGuestAccess) {
      updateReportFromLocalStorage(json.data);
    }
  }
};

export default taxAmountModal;
