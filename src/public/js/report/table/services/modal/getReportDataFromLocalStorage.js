var getRequiredSkuProperties = ({
  tax,
  qty,
  profit,
  costPrice,
  finalProfit,
  profitMargin,
  retailAmount,
  insuranceFee,
  preTaxProfit,
  otherExpenses,
}) => {
  return {
    tax,
    qty,
    profit,
    costPrice,
    finalProfit,
    profitMargin,
    retailAmount,
    insuranceFee,
    preTaxProfit,
    otherExpenses,
  };
};

var getReportDataFromLocalStorage = (skuData) => {
  var { userId, skuName } = skuData;
  var reportAsJSON = localStorage.getItem(userId);
  var report = JSON.parse(reportAsJSON);

  var skuFromReport = report.skus.find((sku) => sku.skuName === skuName);

  var requiredSkuData = getRequiredSkuProperties(skuFromReport);
  return requiredSkuData;
};

export default getReportDataFromLocalStorage;
