import calcReportTotalsFromSkus from "../../../reports/services/calcServices/utils/calcReportTotalsFromSkus.js";

var mergeSkuDataBySkuNameAndYear = (listGoods, sortedSkusBySkuNameAndYear) => {
  var mergedSkus = [];

  for (var skuFromListGoods of listGoods) {
    for (var { year, data } of sortedSkusBySkuNameAndYear) {
      var skusFilteredBySkuName = data.filter((sku) => sku.skuName === skuFromListGoods.skuName);

      var mergedSkuData = calcReportTotalsFromSkus(skusFilteredBySkuName).reportTotals;
      mergedSkuData.year = year;
      mergedSkuData.skuName = skuFromListGoods.skuName;

      var existYear = mergedSkus.find((item) => item?.year === year);

      if (!existYear) {
        mergedSkus.push({ year, data: [mergedSkuData] });
      } else {
        existYear.data.push(mergedSkuData);
      }
    }
  }

  return { mergedSkus };
};

export default mergeSkuDataBySkuNameAndYear;
