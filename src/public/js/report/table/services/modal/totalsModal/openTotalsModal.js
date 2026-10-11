import createTotalsModal from "./createTotalsModal.js";
import createButton from "../utils/createButton.js";

var openTotalsModal = (data, isGuestAccess = false) => {
  var container = document.createElement("div");
  container.className = "editable-field";

  var displayElement = document.createElement("span");
  displayElement.className = "editable-field-value";
  displayElement.textContent = data.data.value;
  displayElement.id = `${data.data.key}-${data.year}`;

  var event = "click";
  var cb = () => {
    var hasActiveModal = document.getElementById("modal-window");

    if (!hasActiveModal) {
      createTotalsModal(data, displayElement, isGuestAccess);
    }
  };

  var buttonTextContent = "Изменить";
  var openTotalsModalButton = createButton(
    "editable-field-button",
    buttonTextContent,
    {
      event,
      cb,
    },
  );

  container.append(displayElement, openTotalsModalButton);
  return container;
};

export default openTotalsModal;
