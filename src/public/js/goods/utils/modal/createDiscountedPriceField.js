var createDiscountedPriceField = ({ skuName, discountedPrice }) => {
  var label = document.createElement("label");

  if (typeof discountedPrice === "undefined" || discountedPrice === null || isNaN(discountedPrice)) {
    discountedPrice = 0;
  }

  label.innerHTML = `цена со скидкой: <div class="price-value" id="${skuName}-discountedPrice-modal">${discountedPrice}</div>`;
  return label;
};
export default createDiscountedPriceField;
