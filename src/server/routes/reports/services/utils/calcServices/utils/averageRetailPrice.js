var calcAverageRetailPrice = (quantity, sku) => {
  var allRetailPricesZero = sku.every((e) => +e.retailPrice === 0);

  if (allRetailPricesZero) {
    return 0;
  }

  var retailPrices = sku.reduce((acc, e) => acc + +e.retailPrice, 0);

  var averageRetailPrice = retailPrices / quantity;

  return averageRetailPrice;
};

export default calcAverageRetailPrice;
