import calcDiscountedPrice from "../weekDaySelector/calcDiscountedPrice.js";

var createDiscountInput = (skuName) => {
  var actualDiscount = document.getElementById(skuName + "-discount");
  var expectedDiscount = document.getElementById(skuName + "-discount-expected");

  var input = document.createElement("input");
  input.type = "text";
  input.className = "input";
  input.id = skuName + "-discount-input-modal";
  input.value = +expectedDiscount?.textContent || +actualDiscount.textContent || 0;

  input.addEventListener("keyup", function () {
    var discount = +this.value;

    if (typeof discount !== "number" || isNaN(discount) || discount < 0) {
      return;
    }

    var priceElem = document.getElementById(skuName + "-price-input-modal");
    var price = priceElem.value;

    if (typeof price !== "number" || isNaN(price) || price < 0) {
      return;
    }

    var newDiscountedPriceValue = calcDiscountedPrice({ price, discount });

    if (typeof newDiscountedPriceValue !== "number" || isNaN(newDiscountedPriceValue)) {
      return;
    }

    var modalDiscountedPriceElement = document.getElementById(skuName + "-discountedPrice-modal");

    modalDiscountedPriceElement.textContent = newDiscountedPriceValue;
  });

  return input;
};

export default createDiscountInput;
