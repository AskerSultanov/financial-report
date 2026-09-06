import truncateNum from "../../reportParsing/truncateNum.js";

var calcPreTaxProfit = (sku) => {
  var productCosts;

  if (sku.profit === 0 || sku.qty === 0) {
    productCosts = 0;
  } else {
    productCosts = sku.qty * sku.costPrice;
  }

  var preTaxProfit = sku.profit - sku.otherExpenses - productCosts;
  return truncateNum(preTaxProfit);
};

export default calcPreTaxProfit;
