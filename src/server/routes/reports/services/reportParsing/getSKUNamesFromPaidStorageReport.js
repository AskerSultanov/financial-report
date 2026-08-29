var getSkuNamesFromPaidStorageReport = (paidStorageReport) => {
  var skuNamesFromPaidStorageReport = [];

  if (!paidStorageReport.length) {
    return { skuNamesFromPaidStorageReport };
  }

  for (var elem of paidStorageReport) {
    if (!skuNamesFromPaidStorageReport.includes(elem.vendorCode)) {
      skuNamesFromPaidStorageReport.push(elem.vendorCode);
    }
  }

  return { skuNamesFromPaidStorageReport };
};

export default getSkuNamesFromPaidStorageReport;
