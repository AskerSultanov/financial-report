import calc from "../calcServices/index.js";

import getSKUNamesFromPaidStorageReport from "./getSKUNamesFromPaidStorageReport.js";

var parsePaidStorageReport = async (report) => {
  var skuNames = await getSKUNamesFromPaidStorageReport(report);

  var data = [];

  for (var name of skuNames) {
    var skuStorageCost = await calc.sku.storageCostFromPaidStorageReport(report, name);

    data.push({ name, skuStorageCost });
  }

  return data;
};

export default parsePaidStorageReport;
