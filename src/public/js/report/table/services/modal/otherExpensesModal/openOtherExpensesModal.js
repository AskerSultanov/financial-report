import otherExpensesModal from "./otherExpensesModal.js";

var editablePen = "&#9999;&#65039;";

var openOtherExpensesModal = (sku) => {
  var container = document.createElement("div");
  container.className = "editable-field";

  var displayElem = document.createElement("span");
  displayElem.className = "editable-field-value";
  displayElem.textContent = sku.otherExpenses;
  displayElem.id = `otherExpenses-${sku.skuName}-${sku.year}`;

  var openModalButton = document.createElement("button");
  openModalButton.className = "editable-field-button";

  openModalButton.addEventListener("click", () => {
    var hasActiveModal = document.getElementById("modal-window");

    if (!hasActiveModal) {
      otherExpensesModal(sku, displayElem);
    }
  });

  openModalButton.innerHTML = editablePen;

  container.append(displayElem, openModalButton);
  return container;
};

export default openOtherExpensesModal;
