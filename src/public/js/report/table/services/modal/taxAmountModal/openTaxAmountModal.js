import taxAmountModal from "./taxAmountModal.js";
import createButton from "../utils/createButton.js";

var openTaxAmountModal = (data, isGuestAccess) => {
  var container = document.createElement("div");
  container.className = "editable-field";

  var taxAmountDisplayElement = document.createElement("span");
  taxAmountDisplayElement.className = "editable-field-value";
  taxAmountDisplayElement.textContent = data.taxAmount;
  taxAmountDisplayElement.id = `taxAmount-${data.year}`;
    console.log(taxAmountDisplayElement)
  var event = "click";
  var cb = () => {
    var hasActiveModal = document.getElementById("modal-window");

    if (!hasActiveModal) {
      taxAmountModal(data, taxAmountDisplayElement, isGuestAccess);
    }
  };

  var buttonTextContent = "Изменить";
  var openTaxAmountModalButton = createButton(
    "editable-field-button",
    buttonTextContent,
    {
      event,
      cb,
    },
  );

  container.append(taxAmountDisplayElement, openTaxAmountModalButton);
  return container;
};

export default openTaxAmountModal;
