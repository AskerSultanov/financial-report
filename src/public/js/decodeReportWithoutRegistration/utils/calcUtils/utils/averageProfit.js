var calcAverageProfit = (sku) => {
  if (sku.profit == 0 || sku.qty == 0) {
    return 0;
  }

  var averageProfit = sku.profit / sku.qty;

  return averageProfit;
};

export default calcAverageProfit;
