import calcDiscountedPrice from "../weekDaySelector/calcDiscountedPrice.js";

var createPriceInput = (skuName) => {
  var actualPrice = document.getElementById(skuName + "-price");
  var expectedPrice = document.getElementById(skuName + "-price-expected");

  var input = document.createElement("input");
  input.type = "text";
  input.className = "input";
  input.id = skuName + "-price-input-modal";
  input.value = expectedPrice?.textContent || actualPrice.textContent || 0;

  input.addEventListener("keyup", function () {
    var price = +this.value;

    if (typeof price !== "number" || isNaN(price) || price < 0) {
      return;
    }

    var discountElem = document.getElementById(skuName + "-discount-input-modal");
    var discount = +discountElem.value;

    if (typeof discount !== "number" || isNaN(discount) || discount < 0) {
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

export default createPriceInput;
