import parseSku from "./parseSku.js";
import calc from "../calcServices/index.js";
import truncateSkuNums from "./truncateSkuNums.js";
import getSkuNamesAndIds from "./getSkuNamesAndIds.js";
import parsePaidStorageReport from "./parsePaidStorageReport.js";
import recalculateSkuAndTaxParams from "./recalculateSkuAndTaxParams.js";

var processNonCrossReportSkus = async (reports, taxParams) => {
  var skus = [];

  var recalculatedTaxParams = Object.assign({}, taxParams);

  var { weeklyFinancialReport, paidStorageReport, advertisingReport } = reports;

  var totalSold = await calc.total.sold(weeklyFinancialReport);
  var totalStorageCost = await calc.total.storageCost(weeklyFinancialReport);
  var totalAdvertisingCosts = await calculateTotalAdvertisingCosts(advertisingReport);
  var totals = { totalSold, totalStorageCost, totalAdvertisingCosts };

  var skuNamesAndIds = getSkuNamesAndIds(weeklyFinancialReport);

  var storageDataFromPaidStorageReport = await parsePaidStorageReport(paidStorageReport);

  for (var { id, name } of skuNamesAndIds) {
    var skuFilteredReport = weeklyFinancialReport.filter((sku) => sku.vendorCode === name);
    var skuStorageCost = storageDataFromPaidStorageReport.find((item) => item.name === name)?.skuStorageCost || 0;
    var sku = await parseSku(name, skuNamesAndIds.length, skuFilteredReport, skuStorageCost, taxParams.taxRate, totals);

    sku.id = id;
    sku.skuName = name;

    var { skuAdditionalInsuranceFee, updatedTaxParams } = recalculateSkuAndTaxParams(sku, recalculatedTaxParams);

    sku.additionalInsuranceFee = skuAdditionalInsuranceFee;
    recalculatedTaxParams = Object.assign(recalculatedTaxParams, updatedTaxParams);

    skus.push(sku);
  }

  skus = await truncateSkuNums(skus);

  return { skus, recalculatedTaxParams, skuNamesAndIds };
};

export default processNonCrossReportSkus;

var calculateTotalAdvertisingCosts = async function (data) {
  return data.reduce((acc, i) => acc + i.updSum, 0);
};
