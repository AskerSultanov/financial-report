var filterCostsForReportSkus = (skusFromReport, skusFromListGoods) => {
  var filteredSkusWithLastCostPrices = [];

  for (var skuFromReport of skusFromReport) {
    var skuFromListGoods = skusFromListGoods.find((item) => item.skuName === skuFromReport.skuName);

    var costPriceAndLastCostPriceNotEqual = skuFromListGoods?.lastCostPrice !== skuFromReport?.costPrice;
    var skuNotIncluded = !filteredSkusWithLastCostPrices.find((item) => item?.skuName === skuFromReport.skuName);

    if (skuFromListGoods?.lastCostPrice && costPriceAndLastCostPriceNotEqual && skuNotIncluded) {
      filteredSkusWithLastCostPrices.push(skuFromListGoods);
    }
  }

  return { filteredSkusWithLastCostPrices };
};

export default filterCostsForReportSkus;
