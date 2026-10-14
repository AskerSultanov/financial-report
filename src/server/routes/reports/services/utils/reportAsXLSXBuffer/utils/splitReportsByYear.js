var splitReportsByYear = (reports, startYear) => {
  var startYearSkus = [];
  var endYearSkus = [];

  for (var { skus } of reports) {
    for (var sku of skus) {
      if (sku.year === startYear) {
        startYearSkus.push(sku);
      } else {
        endYearSkus.push(sku);
      }
    }
  }

  return { startYearSkus, endYearSkus };
};

export default splitReportsByYear;
