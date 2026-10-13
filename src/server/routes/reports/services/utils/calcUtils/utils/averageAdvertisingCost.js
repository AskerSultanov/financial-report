var caclAverageAdvertisingCost = (skuQty, totalAdvertisingCosts) => {
  if (!skuQty) {
    return 0;
  }

  var averageAdvertisingCost = totalAdvertisingCosts / skuQty;
  return averageAdvertisingCost;
};

export default caclAverageAdvertisingCost;
