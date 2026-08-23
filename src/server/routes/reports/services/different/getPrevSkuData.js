var getPrevSkuData = (sku) => {
  var prevSkuData = {};

  prevSkuData.qty = sku.qty;
  prevSkuData.costPrice = sku.costPrice;
  prevSkuData.profitMargin = sku.profitMargin;
  prevSkuData.finalProfit = sku.finalProfit;
  prevSkuData.preTaxProfit = sku.preTaxProfit;
  prevSkuData.insuranceFee = sku.insuranceFee;
  prevSkuData.otherExpenses = sku.otherExpenses;

  return prevSkuData;
};

export default getPrevSkuData;
