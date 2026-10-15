import otherExpensesModal from "./otherExpensesModal.js";

var editablePen = "&#9999;&#65039;";

var openOtherExpensesModal = (skuData, isGuestAccess) => {
  var container = document.createElement("div");
  container.className = "editable-field";

  var otherExpensesTdElement = document.createElement("span");
  otherExpensesTdElement.className = "editable-field-value";
  otherExpensesTdElement.textContent = skuData.otherExpenses;
  otherExpensesTdElement.id = `otherExpenses-${skuData.skuName}-${skuData.year}`;

  var openModalButton = document.createElement("button");
  openModalButton.className = "editable-field-button";

  openModalButton.addEventListener("click", () => {
    var hasActiveModal = document.getElementById("modal-window");

    if (!hasActiveModal) {
      otherExpensesModal(skuData, otherExpensesTdElement, isGuestAccess);
    }
  });

  openModalButton.innerHTML = editablePen;

  container.append(otherExpensesTdElement, openModalButton);
  return container;
};

export default openOtherExpensesModal;
