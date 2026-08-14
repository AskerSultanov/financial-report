export var defaultSkuMetricsField = {
  qty: 0,
  tax: 0,
  fines: 0,
  netProfit: 0,
  profitMargin: 0,
  retailAmount: 0,
  returnAmount: 0,
  storageCost: 0,
  deliveryCost: 0,
  taxableAmount: 0,
  acceptance: 0,
  insuranceFee: 0,
  otherExpenses: 0,
  sellerPayoutAmount: 0,
  deductionOrPayment: 0,
  additionalInsuranceFee: 0,
};

export var addDefaultMetricsToSku = (listGoods, isCrossYearPeriod, startYear, endYear) => {
  for (var sku of listGoods) {
    if (isCrossYearPeriod) {
      if (!sku.metrics.find((i) => i.year === startYear)) {
        sku.metrics.push({ ...defaultSkuMetricsField, year: startYear });
      }

      if (!sku.metrics.find((i) => i.year === endYear)) {
        sku.metrics.push({ ...defaultSkuMetricsField, year: endYear });
      }
    } else {
      if (!sku.metrics.find((i) => i.year === startYear)) {
        sku.metrics.push({ ...defaultSkuMetricsField, year: startYear });
      }
    }
  }

  return listGoods;
};
