import calcProfitMargin from "./profitMargin.js";
import calcPreTaxProfit from "./preTaxProfit.js";

var calcRestSkuParams = (sku) => {
  var updatedSku = {};

  updatedSku.qty = sku.qty;
  updatedSku.profit = sku.profit;
  updatedSku.isCostPriceSet = true;
  updatedSku.costPrice = sku.costPrice;
  updatedSku.otherExpenses = sku.otherExpenses;

  var newPreTaxProfit = calcPreTaxProfit(updatedSku);
  updatedSku.preTaxProfit = newPreTaxProfit;

  var newFinalProfit = newPreTaxProfit;
  var newProfitMargin = calcProfitMargin(newFinalProfit, sku.retailAmount);

  updatedSku.finalProfit = newFinalProfit;
  updatedSku.profitMargin = newProfitMargin;

  return { updatedSku };
};

export default calcRestSkuParams;
