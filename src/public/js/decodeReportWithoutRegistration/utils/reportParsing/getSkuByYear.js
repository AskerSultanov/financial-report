var getSkuByYear = (skuFilteredReport, requiredYear) => {
  var skuByYear = [];

  if (!skuFilteredReport.length) {
    return { skuByYear };
  }

  var requiredYearAsStr = requiredYear + "";

  for (var sku of skuFilteredReport) {
    var saleYear = sku.saleDt.split("-")[0];

    if (saleYear === requiredYearAsStr) {
      skuByYear.push(sku);
    }
  }

  return { skuByYear };
};

export default getSkuByYear;
