import createDiv from "./createDiv.js";
import createLabel from "./createLabel.js";
import createButton from "./createButton.js";
import createPriceInput from "./createPriceInput.js";
import saveButtonHandler from "./saveButtonHandler.js";
import createDiscountInput from "./createDiscountInput.js";
import cancelButtonHandler from "./cancelButtonHandler.js";
import createWeekDaysPicker from "./createWeekDaysPicker.js";
import createDiscountedPriceField from "./createDiscountedPriceField.js";
import createCheckboxForParticipationInPromo from "../createCheckboxForParticipationInPromo.js";

var changePriceIfInPromo = null;
var needWrapIntoFieldset = true;

var createModal = (item) => {
  var modalTitle = (document.createElement("h3").textContent = "Артикул: " + item.skuName);

  var modalHeader = createDiv(null, "modal-header");
  modalHeader.append(modalTitle);

  var modalOverlay = createDiv("modalOverlay", "modal-overlay", null, "enableHandlers - yes");

  var priceInput = createPriceInput(item.skuName);
  var priceLabel = createLabel(priceInput, "цена", "wrapinput - yes");

  var discountInput = createDiscountInput(item.skuName);
  var discountLabel = createLabel(discountInput, "скидка", "wrapinput - yes");

  var discountedPriceField = createDiscountedPriceField(item);

  var modal = createDiv(null, "modal");

  var cancelBtn = createButton("Закрыть", null, "cancelBtn", cancelButtonHandler(modalOverlay));

  var saveBtn = createButton("Сохранить", "btn btn-primary", "confirmBtn", saveButtonHandler(modalOverlay, item, priceInput, discountInput));

  var modalButtons = createDiv(null, "modal-buttons");
  modalButtons.append(cancelBtn, saveBtn);

  var weekDaysPicker = createWeekDaysPicker();

  modal.append(
    modalHeader,
    priceLabel,
    discountLabel,
    discountedPriceField,
    createCheckboxForParticipationInPromo(item, changePriceIfInPromo, needWrapIntoFieldset),
    weekDaysPicker,
    modalButtons,
  );

  modalOverlay.append(modal);

  document.body.append(modalOverlay);

  return modalOverlay;
};

export default createModal;
