import costPriceModal from "./costPriceModal.js";

var editablePen = "&#9999;&#65039;";

var openCostPriceModal = (skuData, isGuestAccess) => {
  var container = document.createElement("div");
  container.className = "editable-field";

  var costPriceDisplayElement = document.createElement("span");
  costPriceDisplayElement.className = "editable-field-value";
  costPriceDisplayElement.textContent = skuData.costPrice;
  costPriceDisplayElement.id = `costPrice-${skuData.skuName}-${skuData.year}`;

  var openModalButton = document.createElement("button");
  openModalButton.className = "editable-field-button";

  openModalButton.addEventListener("click", () => {
    var hasActiveModal = document.getElementById("modal-window");

    if (!hasActiveModal) {
      costPriceModal(skuData, costPriceDisplayElement, isGuestAccess);
    }
  });

  openModalButton.innerHTML = editablePen;

  container.append(costPriceDisplayElement, openModalButton);
  return container;
};

export default openCostPriceModal;
