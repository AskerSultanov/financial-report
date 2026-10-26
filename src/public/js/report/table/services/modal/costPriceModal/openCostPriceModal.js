import costPriceModal from "./costPriceModal.js";

var editablePen = "&#9999;&#65039;";

var openCostPriceModal = (sku) => {
  var container = document.createElement("div");
  container.className = "editable-field";

  var displayElem = document.createElement("span");
  displayElem.className = "editable-field-value";
  displayElem.textContent = sku.costPrice;
  displayElem.id = `costPrice-${sku.skuName}-${sku.year}`;

  var openModalButton = document.createElement("button");
  openModalButton.className = "editable-field-button";

  openModalButton.addEventListener("click", () => {
    var hasActiveModal = document.getElementById("modal-window");

    if (!hasActiveModal) {
      costPriceModal(sku, displayElem);
    }
  });

  openModalButton.innerHTML = editablePen;

  container.append(displayElem, openModalButton);
  return container;
};

export default openCostPriceModal;
