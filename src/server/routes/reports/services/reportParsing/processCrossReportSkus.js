import parseSku from "./parseSku.js";
import calc from "../calcServices/index.js";
import truncateNum from "./truncateNum.js";
import splitSkuByYear from "./splitSkuByYear.js";
import truncateSkuNums from "./truncateSkuNums.js";
import getSkuNamesAndIds from "./getSkuNamesAndIds.js";
import parsePaidStorageReport from "./parsePaidStorageReport.js";
import recalculateSkuAndTaxParams from "./recalculateSkuAndTaxParams.js";
import splitPaidStorageReportByYear from "./splitPaidStorageReportByYear.js";
import splitAdvertisingReportByYear from "./splitAdvertisingReportByYear.js";
import splitWeeklyFinancialReportByYear from "./splitWeeklyFinancialReportByYear.js";

var calculateTotalAdvertisingCosts = async (data) => data.reduce((acc, i) => acc + i.updSum, 0);

var processCrossReportSkus = async (reports, taxParams) => {
  var startYearTaxParams = { ...taxParams.startYearTaxParams };
  var endYearTaxParams = { ...taxParams.endYearTaxParams };

  var { weeklyFinancialReport, paidStorageReport, advertisingReport } = reports;

  var { startYearAd, endYearAd } = await splitAdvertisingReportByYear(advertisingReport, startYearTaxParams.year);
  var { startYearStorageData, endYearStorageData } = await splitPaidStorageReportByYear(paidStorageReport, startYearTaxParams.year);

  startYearStorageData = await parsePaidStorageReport(startYearStorageData);
  endYearStorageData = await parsePaidStorageReport(endYearStorageData);
  paidStorageReport = await parsePaidStorageReport(paidStorageReport);

  var { startYearWeeklyFinancialReport, endYearWeeklyFinancialReport } = await splitWeeklyFinancialReportByYear(weeklyFinancialReport, startYearTaxParams.year);

  var startYearTotals = {};
  startYearTotals.totalSold = await calc.total.sold(startYearWeeklyFinancialReport);
  startYearTotals.totalStorageCost = await calc.total.storageCost(startYearWeeklyFinancialReport);
  startYearTotals.totalAdvertisingCosts = await calculateTotalAdvertisingCosts(startYearAd);

  var endYearTotals = {};
  endYearTotals.totalSold = await calc.total.sold(endYearWeeklyFinancialReport);
  endYearTotals.totalStorageCost = await calc.total.storageCost(endYearWeeklyFinancialReport);
  endYearTotals.totalAdvertisingCosts = await calculateTotalAdvertisingCosts(endYearAd);

  var skus = [];
  var skuNamesAndIds = getSkuNamesAndIds(weeklyFinancialReport);
  var skuNamesAndIdsInCurrentYear = getSkuNamesAndIds(startYearWeeklyFinancialReport);
  var skuNamesAndIdsInNextYear = getSkuNamesAndIds(endYearWeeklyFinancialReport);

  for (var { name } of skuNamesAndIds) {
    var skuFilteredReport = weeklyFinancialReport.filter((sku) => sku.vendorCode === name);
    var startYearSkuStorageCost = startYearStorageData.find((item) => item.name === name)?.skuStorageCost || 0;
    var endYearSkuStorageCost = endYearStorageData.find((item) => item.name === name)?.skuStorageCost || 0;

    var { startYearSku, endYearSku } = splitSkuByYear(skuFilteredReport, startYearTaxParams.year);

    var startYearSkuData = await parseSku(name, skuNamesAndIdsInCurrentYear.length, startYearSku, startYearSkuStorageCost, startYearTaxParams.taxRate, startYearTotals);

    if (startYearSkuData) {
      var { skuAdditionalInsuranceFee, updatedTaxParams } = recalculateSkuAndTaxParams(startYearSkuData, startYearTaxParams);

      startYearTaxParams = Object.assign(startYearTaxParams, updatedTaxParams);
      startYearSkuData.additionalInsuranceFee = skuAdditionalInsuranceFee;

      skus.push(startYearSkuData);
    }

    var endYearSkuData = await parseSku(name, skuNamesAndIdsInNextYear.length, endYearSku, endYearSkuStorageCost, endYearTaxParams.taxRate, endYearTotals);

    if (endYearSkuData) {
      var { skuAdditionalInsuranceFee, updatedTaxParams } = recalculateSkuAndTaxParams(endYearSkuData, endYearTaxParams);

      endYearTaxParams = Object.assign(endYearTaxParams, updatedTaxParams);
      endYearSkuData.additionalInsuranceFee = skuAdditionalInsuranceFee;

      skus.push(endYearSkuData);
    }
  }

  return { skus, skuNamesAndIds, recalculatedTaxParams: { startYearTaxParams, endYearTaxParams } };
};

export default processCrossReportSkus;
