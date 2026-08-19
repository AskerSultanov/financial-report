var filterCostsForReportSkus = (skusFromReport, skusFromListGoods) => {
  var filteredSkusWithLastCostPrices = [];

  for (var skuFromReport of skusFromReport) {
    var skuFromListGoods = skusFromListGoods.find((item) => item.skuName === skuFromReport.skuName);

    if (skuFromListGoods?.lastCostPrice && skuFromListGoods?.lastCostPrice !== skuFromReport?.costPrice) {
      filteredSkusWithLastCostPrices.push(skuFromListGoods);
    }
  }

  return { filteredSkusWithLastCostPrices };
};

export default filterCostsForReportSkus;
