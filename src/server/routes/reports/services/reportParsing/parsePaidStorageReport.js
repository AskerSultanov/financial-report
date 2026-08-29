import calc from "../calcServices/index.js";

import getSkuNamesFromPaidStorageReport from "./getSkuNamesFromPaidStorageReport.js";

var parsePaidStorageReport = (paidStorageReport) => {
  var parsedPaidStorageReport = [];

  if (!paidStorageReport.length) {
    return { parsedPaidStorageReport };
  }

  var { skuNamesFromPaidStorageReport } = getSkuNamesFromPaidStorageReport(paidStorageReport);

  for (var name of skuNamesFromPaidStorageReport) {
    var { skuStorageCost } = calc.sku.storageCostFromPaidStorageReport(paidStorageReport, name);

    parsedPaidStorageReport.push({ name, skuStorageCost });
  }

  return { parsedPaidStorageReport };
};

export default parsePaidStorageReport;
