var splitReportByYear = (skus, startYear, sGuestAccess) => {
  var startYearSkus = [];
  var endYearSkus = [];

  for (var sku of skus) {
    sku.year === startYear ? startYearSkus.push(sku) : endYearSkus.push(sku);
  }

  return { startYearSkus, endYearSkus };
};

export default splitReportByYear;
