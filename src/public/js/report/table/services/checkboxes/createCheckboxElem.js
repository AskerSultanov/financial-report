import createTdElement from "../createTdElement.js";

var createCheckboxElem = (year, skuName) => {
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  if (skuName) {
    checkbox.id = "sku-checkbox-" + skuName;
    checkbox.setAttribute("sku-checkbox", year);
    checkbox.setAttribute("skuName", skuName);
  }

  var wrappedCheckbox = createTdElement(checkbox);
  wrappedCheckbox.setAttribute("sku-checkbox-parent", year);

  return { checkbox: wrappedCheckbox };
};

export default createCheckboxElem;
