import calcProfitMargin from "./profitMargin.js";

var calcReportTotalsFromSkus = (skus) => {
  var retailAmount = skus.reduce((acc, sku) => acc + sku.retailAmount, 0);
  var sold = skus.reduce((acc, sku) => acc + sku.qty, 0);
  var returnAmount = skus.reduce((acc, sku) => acc + sku.returnAmount, 0);
  var sellerPayoutAmount = skus.reduce((acc, sku) => acc + sku.sellerPayoutAmount, 0);
  var productCosts = skus.reduce((acc, sku) => acc + sku.costPrice, 0);
  var otherExpenses = skus.reduce((acc, sku) => acc + sku.otherExpenses, 0);
  var deliveryCost = skus.reduce((acc, sku) => acc + sku.deliveryCost, 0);
  var paidAcceptance = skus.reduce((acc, sku) => acc + sku.acceptance, 0);
  var fines = skus.reduce((acc, sku) => acc + sku.fines, 0);
  var deductionOrPayment = skus.reduce((acc, sku) => acc + sku.deductionOrPayment, 0);
  var storageCost = skus.reduce((acc, sku) => acc + sku.storageCost, 0);
  var advertisingCosts = skus.reduce((acc, sku) => acc + sku.averageAdvertisingCost, 0);
  var taxAmount = skus.reduce((acc, sku) => acc + sku.tax, 0);
  var insuranceFee = skus.reduce((acc, sku) => acc + sku.insuranceFee, 0);
  var additionalInsuranceFee = skus.reduce((acc, sku) => acc + sku.additionalInsuranceFee, 0);
  var finalProfit = skus.reduce((acc, sku) => acc + sku.finalProfit, 0);

  var taxableAmount = skus.reduce((acc, sku) => acc + sku.taxableAmount, 0);

  var profitMargin = calcProfitMargin(finalProfit, retailAmount);

  var reportTotals = {
    retailAmount,
    taxableAmount,
    sold,
    returnAmount,
    sellerPayoutAmount,
    productCosts,
    otherExpenses,
    deliveryCost,
    paidAcceptance,
    fines,
    deductionOrPayment,
    storageCost,
    advertisingCosts,
    taxAmount,
    insuranceFee,
    additionalInsuranceFee,
    profitMargin,
    finalProfit,
  };

  return { reportTotals };
};

export default calcReportTotalsFromSkus;
