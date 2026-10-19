var getSkuNamesFromWeeklyFinancialReport = (report) => {
  var skuNamesFromWeeklyFinancialReport = [];

  for (var sku of report) {
    if (!skuNamesFromWeeklyFinancialReport.includes(sku.vendorCode) && sku.vendorCode) {
      skuNamesFromWeeklyFinancialReport.push(sku.vendorCode);
    }
  }

  return { skuNamesFromWeeklyFinancialReport };
};

export default getSkuNamesFromWeeklyFinancialReport;
