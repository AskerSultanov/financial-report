import createButton from "./services/modal/utils/createButton.js";
import addCheckboxesToSkusTable from "./services/checkboxes/addCheckboxesToSkusTable.js";
import removeCheckboxesFromSkusTable from "./services/checkboxes/removeCheckboxesFromSkusTable.js";

var event = "click";
var text = "Выбрать";
var newText = "Убрать выделение";
var className = "sku-selector-btn";

var createSkuSelectorButton = (skus, bulkButtons = []) => {
  var { year } = skus[0];

  var button = createButton(className, text, {
    event,
    cb: skuSelectorButtonHandler,
  });
  button.type = "button";
  button.setAttribute("aria-pressed", "false");

  return button;

  function skuSelectorButtonHandler() {
    var { checkboxesIsExist } = checkCheckboxesExist(year);

    if (checkboxesIsExist) {
      deactivateSelectionMode();
    } else {
      activateSelectionMode();
    }
  }

  function activateSelectionMode() {
    button.textContent = newText;
    button.classList.add("is-active");
    button.setAttribute("aria-pressed", "true");

    addCheckboxesToSkusTable(skus);

    for (var bulkButton of bulkButtons) {
      bulkButton.hidden = false;
      bulkButton.disabled = true;
    }
  }

  function deactivateSelectionMode() {
    button.textContent = text;
    button.classList.remove("is-active");
    button.setAttribute("aria-pressed", "false");

    removeCheckboxesFromSkusTable(year);

    for (var bulkButton of bulkButtons) {
      bulkButton.hidden = true;
      bulkButton.disabled = true;
    }
  }
};

export default createSkuSelectorButton;

function checkCheckboxesExist(year) {
  var primaryCheckboxId = "checkbox-" + year;
  var primaryCheckbox = document.getElementById(primaryCheckboxId);

  var querySelector = `input[sku-checkbox="${year}"]`;
  var seconaryCheckboxes = document.querySelectorAll(querySelector);
  seconaryCheckboxes.forEach((item) => item?.remove());

  if (primaryCheckbox || seconaryCheckboxes.length) {
    return { checkboxesIsExist: true };
  }

  return { checkboxesIsExist: false };
}
