var requiredSkusFieldsName = [
  "skuName",
  "qty",
  "returnAmount",
  "retailAmount",
  "sellerPayoutAmount",
  "deliveryCost",
  "deductionOrPayment",
  "averageAdvertisingCost",
  "storageCost",
  "acceptance",
  "fines",
  "profit",
  "costPrice",
  "otherExpenses",
  "profitMargin",
  "finalProfit",
];

var getRequiredSkusFieldsName = (skus) =>
  skus.map((sku) => {
    return {
      skuName: sku.skuName,
      qty: sku.qty,
      returnAmount: sku.returnAmount,
      retailAmount: sku.retailAmount,
      sellerPayoutAmount: sku.sellerPayoutAmount,
      deliveryCost: sku.deliveryCost,
      deductionOrPayment: sku.deductionOrPayment,
      averageAdvertisingCost: sku.averageAdvertisingCost,
      storageCost: sku.storageCost,
      acceptance: sku.acceptance,
      fines: sku.fines,
      profit: sku.profit,
      tax: sku.tax,
      costPrice: sku.costPrice,
      otherExpenses: sku.otherExpenses,
      insuranceFee: sku.insuranceFee,
      additionalInsuranceFee: sku.additionalInsuranceFee,
      profitMargin: sku.profitMargin,
      finalProfit: sku.finalProfit,
    };
  });

export { getRequiredSkusFieldsName, requiredSkusFieldsName };
