import createDiv from "../utils/createDiv.js";
import createTitle from "../utils/createTitle.js";
import createInput from "../utils/createInput.js";
import createButton from "../utils/createButton.js";
import getPrevSkuFieldsValue from "../../getPrevSkuFieldsValue.js";
import updateSkusTableFields from "../../updateSkusTableFields.js";
import updateTotalsTableFields from "../../updateTotalsTableFields.js";
import updateReportFromLocalStorage from "../../updateReportFromLocalStorage.js";

var event = "click";

var titlesMap = {
  taxAmount: "Добавить налоги к отчету",
  insuranceFee: "Добавить страховые взносы к отчету",
  additionalInsuranceFee: "Добавить доп. страховые взносы к отчету",
};

var createTotalsModal = (dataToUpdation, displayElement, isGuestAccess) => {
  var modal = createDiv("modal-overlay");
  modal.id = "modal-window";

  var modalContent = createDiv("modal-content");

  var titleContent = titlesMap[dataToUpdation.data.key];
  var title = createTitle("modal-title", titleContent);

  var input = createInput("modal-input", displayElement);

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
    document.body.removeChild(modal);

    dataToUpdation.data.value = +input.value;

    displayElement.textContent = input.value;

    var url = "/report/" + dataToUpdation.data.key;

    return;
    var res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(dataToUpdation),
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

export default createTotalsModal;
