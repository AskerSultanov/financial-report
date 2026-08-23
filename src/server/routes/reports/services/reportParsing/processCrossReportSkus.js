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
  var recalculatedTaxParams = {};
  recalculatedTaxParams.startYearTaxParams = Object.assign({}, taxParams.startYearTaxParams);
  recalculatedTaxParams.endYearTaxParams = Object.assign({}, taxParams.endYearTaxParams);

  var { endYearTaxParams, startYearTaxParams } = recalculatedTaxParams;

  var { weeklyFinancialReport, paidStorageReport, advertisingReport } = reports;

  var { startYearAd, endYearAd } = await splitAdvertisingReportByYear(advertisingReport, startYearTaxParams.year);
  var { startYearStorageData, endYearStorageData } = await splitPaidStorageReportByYear(paidStorageReport, startYearTaxParams.year);
  startYearStorageData = await parsePaidStorageReport(startYearStorageData);
  endYearStorageData = await parsePaidStorageReport(endYearStorageData);
  paidStorageReport = await parsePaidStorageReport(paidStorageReport);

  var { startYearWeeklyFinancialReport, endYearWeeklyFinancialReport } = await splitWeeklyFinancialReportByYear(
    weeklyFinancialReport,
    startYearTaxParams.year,
  );

  var startYearTotals = {};
  startYearTotals.totalSold = await calc.total.sold(startYearWeeklyFinancialReport);
  startYearTotals.totalStorageCost = await calc.total.storageCost(startYearWeeklyFinancialReport);
  startYearTotals.totalAdvertisingCosts = await calculateTotalAdvertisingCosts(startYearAd);

  var endYearTotals = {};
  endYearTotals.totalSold = await calc.total.sold(endYearWeeklyFinancialReport);
  endYearTotals.totalStorageCost = await calc.total.storageCost(endYearWeeklyFinancialReport);
  endYearTotals.totalAdvertisingCosts = await calculateTotalAdvertisingCosts(endYearAd);

  var totalSold = startYearTotals.totalSold + endYearTotals.totalSold;
  var totalStorageCost = truncateNum(startYearTotals.totalStorageCost + endYearTotals.totalStorageCost);
  var totalAdvertisingCosts = truncateNum(startYearTotals.totalAdvertisingCosts + endYearTotals.totalAdvertisingCosts);

  var skus = [];
  var skuNamesAndIds = getSkuNamesAndIds(weeklyFinancialReport);
  var skuNamesAndIdsInCurrentYear = getSkuNamesAndIds(startYearWeeklyFinancialReport);
  var skuNamesAndIdsInNextYear = getSkuNamesAndIds(endYearWeeklyFinancialReport);

  for (var { id, name } of skuNamesAndIds) {
    var skuFilteredReport = weeklyFinancialReport.filter((sku) => sku.vendorCode === name);
    var { startYearSku, endYearSku } = splitSkuByYear(skuFilteredReport, startYearTaxParams.year);

    var startYearSkuData = await parseSku(
      name,
      skuNamesAndIdsInCurrentYear.length,
      startYearSku,
      startYearStorageData,
      startYearTaxParams.taxRate,
      startYearTotals,
    );

    if (startYearSkuData?.id) {
      skus.push(startYearSkuData);

      var resultOfStartYearRecalculation = recalculateSkuAndTaxParams(startYearSkuData, recalculatedTaxParams.startYearTaxParams);
      recalculatedTaxParams.startYearTaxParams = resultOfStartYearRecalculation.recalculatedTaxParams;
    }

    var endYearSkuData = await parseSku(
      name,
      skuNamesAndIdsInNextYear.length,
      endYearSku,
      endYearStorageData,
      endYearTaxParams.taxRate,
      endYearTotals,
    );

    if (endYearSkuData?.id) {
      skus.push(endYearSkuData);

      var resultOfEndYearRecalculation = recalculateSkuAndTaxParams(endYearSkuData, recalculatedTaxParams.endYearTaxParams);
      recalculatedTaxParams.endYearTaxParams = resultOfEndYearRecalculation.recalculatedTaxParams;
    }
  }

  return { skus, skuNamesAndIds, totalSold, totalStorageCost, totalAdvertisingCosts, recalculatedTaxParams };
};

export default processCrossReportSkus;
