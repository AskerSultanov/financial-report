var requiredSkusFieldsName = [
  "skuName",
  "qty",
  "returnAmount",
  "costPrice",
  "deliveryCost",
  "deductionOrPayment",
  'averageAdvertisingCost',
  "storageCost",
  "acceptance",
  "profit",
  "tax",
  "otherExpenses",
  "insuranceFee",
  "additionalInsuranceFee",
  "profitMargin",
  "finalProfit",
];

var getRequiredSkusFieldsName = (skus) =>
  skus.map((sku) => {
    return {
      skuName: sku.skuName,
      qty: sku.qty,
      costPrice: sku.costPrice,
      returnAmount: sku.returnAmount,
      deliveryCost: sku.deliveryCost,
      deductionOrPayment: sku.deductionOrPayment,
      averageAdvertisingCost: sku.averageAdvertisingCost,
      storageCost: sku.storageCost,
      acceptance: sku.acceptance,
      profit: sku.profit,
      tax: sku.tax,
      otherExpenses: sku.otherExpenses,
      insuranceFee: sku.insuranceFee,
      additionalInsuranceFee: sku.additionalInsuranceFee,
      profitMargin: sku.profitMargin,
      finalProfit: sku.finalProfit,
    };
  });

export { getRequiredSkusFieldsName, requiredSkusFieldsName };
