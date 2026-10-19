import calcProfitMargin from "./calcProfitMargin.js";

var calcReportTotalsFromSkus = (skus) => {
  var retailAmount = skus
    .reduce((acc, sku) => acc + sku.retailAmount, 0)
    .toFixed(2);

  var sold = skus.reduce((acc, sku) => acc + sku.qty, 0);

  var returnAmount = skus.reduce((acc, sku) => acc + sku.returnAmount, 0);

  var sellerPayoutAmount = skus
    .reduce((acc, sku) => acc + sku.sellerPayoutAmount, 0)
    .toFixed(2);
  var productCosts = skus.reduce(
    (acc, sku) => acc + sku.costPrice * sku.qty,
    0,
  );

  var otherExpenses = skus
    .reduce((acc, sku) => acc + sku.otherExpenses, 0)
    .toFixed(2);

  var deliveryCost = skus
    .reduce((acc, sku) => acc + sku.deliveryCost, 0)
    .toFixed(2);

  var paidAcceptance = skus
    .reduce((acc, sku) => acc + sku.acceptance, 0)
    .toFixed(2);

  var fines = skus.reduce((acc, sku) => acc + sku.fines, 0).toFixed(2);

  var deductionOrPayment = skus
    .reduce((acc, sku) => acc + sku.deductionOrPayment, 0)
    .toFixed(2);

  var storageCost = skus
    .reduce((acc, sku) => acc + sku.storageCost, 0)
    .toFixed(2);

  var advertisingCosts = skus.reduce(
    (acc, sku) => acc + sku.averageAdvertisingCost,
    0,
  );

  var tax = skus.reduce((acc, sku) => acc + sku.tax, 0).toFixed(2);

  var insuranceFee = skus
    .reduce((acc, sku) => acc + sku.insuranceFee, 0)
    .toFixed(2);

  var additionalInsuranceFee = skus
    .reduce((acc, sku) => acc + sku.additionalInsuranceFee, 0)
    .toFixed(2);

  var finalProfit = skus
    .reduce((acc, sku) => acc + sku.finalProfit, 0)
    .toFixed(2);

  //var taxableAmount = skus.reduce((acc, sku) => acc + sku.taxableAmount, 0);

  var profitMargin = calcProfitMargin(finalProfit, retailAmount);

  var reportTotals = {
    retailAmount,
    //  taxableAmount,
    sold,
    returnAmount,
    sellerPayoutAmount,
    deliveryCost,
    paidAcceptance,
    fines,
    deductionOrPayment,
    storageCost,
    advertisingCosts,
    productCosts,
    otherExpenses,
    tax,
    insuranceFee,
    additionalInsuranceFee,
    profitMargin,
    finalProfit,
  };

  return { reportTotals };
};

export default calcReportTotalsFromSkus;
