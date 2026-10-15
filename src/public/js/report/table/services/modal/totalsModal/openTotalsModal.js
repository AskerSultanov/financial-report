import createTotalsModal from "./createTotalsModal.js";

var editablePen = "&#9999;&#65039;";

var openTotalsModal = (data, isGuestAccess = false) => {
  var container = document.createElement("div");
  container.className = "editable-field";

  var displayElement = document.createElement("span");
  displayElement.className = "editable-field-value";
  displayElement.textContent = data.updateField.value;
  displayElement.id = `${data.updateField.key}-${data.year}`;

  var openModalButton = document.createElement("button");
  openModalButton.className = "editable-field-button";
  openModalButton.innerHTML = editablePen;

  openModalButton.addEventListener("click", () => {
    var hasActiveModal = document.getElementById("modal-window");

    if (!hasActiveModal) {
      createTotalsModal(data, displayElement, isGuestAccess);
    }
  });

  container.append(displayElement, openModalButton);
  return container;
};

export default openTotalsModal;
