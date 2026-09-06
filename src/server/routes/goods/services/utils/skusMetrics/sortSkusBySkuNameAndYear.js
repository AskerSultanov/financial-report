var sortSkusBySkuNameAndYear = (listGoods, reports) => {
  var sortedSkusBySkuNameAndYear = [];

  for (var skuFromListGoods of listGoods) {
    for (var { skus } of reports) {
      for (var sku of skus) {
        if (sku.skuName === skuFromListGoods.skuName) {
          var skuYearExist = sortedSkusBySkuNameAndYear.find((item) => item?.year === sku.year);

          if (!skuYearExist) {
            sortedSkusBySkuNameAndYear.push({ year: sku.year, data: [sku] });
          } else {
            var { data } = sortedSkusBySkuNameAndYear.find((item) => item.year === sku.year);
            data.push(sku);
          }
        }
      }
    }
  }

  return { sortedSkusBySkuNameAndYear };
};

export default sortSkusBySkuNameAndYear;
