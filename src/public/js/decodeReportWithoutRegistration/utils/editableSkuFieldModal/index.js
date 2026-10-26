import createEditableFieldModal from "./createEditableSkuFieldModal.js";

var editablePen = "&#9999;&#65039;";

var openEditableSkuFieldModal = (sku, updateField) => {
  var container = document.createElement("div");
  container.className = "editable-field";

  var editableFieldDisplayElement = document.createElement("span");
  editableFieldDisplayElement.className = "editable-field-value";
  editableFieldDisplayElement.textContent = sku[updateField];

  var { year, skuName } = sku;

  editableFieldDisplayElement.id = updateField + `-${skuName}-${year}`;

  var openModalButton = document.createElement("button");
  openModalButton.className = "editable-field-button";

  openModalButton.addEventListener("click", () => {
    var hasActiveModal = document.getElementById("modal-window");

    if (!hasActiveModal) {
      createEditableFieldModal(sku, updateField, editableFieldDisplayElement);
    }
  });

  openModalButton.innerHTML = editablePen;

  container.append(editableFieldDisplayElement, openModalButton);
  return container;
};

export default openEditableSkuFieldModal;
