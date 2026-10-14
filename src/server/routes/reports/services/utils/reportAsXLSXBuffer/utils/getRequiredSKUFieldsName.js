var requiredSKUsFieldsName = [
  "skuName",
  "qty",
  "returnAmount",
  "costPrice",
  "deliveryCost",
  "deductionOrPayment",
  "storageCost",
  "acceptance",
  "otherExpenses",
  "profit",
  "taxableAmount",
  "tax",
  "insuranceFee",
  "additionalInsuranceFee",
  "profitMargin",
  "finalProfit",
];

var getRequiredSKUFieldsName = (skus) =>
  skus.map((sku) => {
    return {
      skuName: sku.skuName,
      qty: sku.qty,
      costPrice: sku.costPrice,
      returnAmount: sku.returnAmount,
      deliveryCost: sku.deliveryCost,
      deductionOrPayment: sku.deductionOrPayment,
      storageCost: sku.storageCost,
      acceptance: sku.acceptance,
      otherExpenses: sku.otherExpenses,
      profit: sku.profit,
      taxableAmount: sku.taxableAmount,
      tax: sku.tax,
      insuranceFee: sku.insuranceFee,
      additionalInsuranceFee: sku.additionalInsuranceFee,
      profitMargin: sku.profitMargin,
      finalProfit: sku.finalProfit,
    };
  });

export { getRequiredSKUFieldsName, requiredSKUsFieldsName };
