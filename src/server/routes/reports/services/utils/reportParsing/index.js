import parseSku from "./parseSku.js";
import calc from "../calcUtils/index.js";
import getSkuByYear from "./getSkuByYear.js";
import truncateSkuNums from "./truncateSkuNums.js";
import parsePaidStorageReport from "./parsePaidStorageReport.js";
import recalculateSkuAndTaxSetting from "./recalculateSkuAndTaxSetting.js";
import getPaidStorageReportByYear from "./getPaidStorageReportByYear.js";
import getAdvertisingReportByYear from "./getAdvertisingReportByYear.js";
import getWeeklyFinancialReportByYear from "./getWeeklyFinancialReportByYear.js";
import getSkuNamesFromWeeklyFinancialReport from "./getSkuNamesFromWeeklyFinancialReport.js";

var processReportSkus = async (reports, taxSetting, isCrossYearPeriod) => {
  var recalculatedTaxSetting = { ...taxSetting };

  var { weeklyFinancialReport, paidStorageReport, advertisingReport } = reports;

  var { storageReportByYear } = getPaidStorageReportByYear(
    paidStorageReport,
    taxSetting.year,
    isCrossYearPeriod,
  );

  var { advertisingReportByYear } = getAdvertisingReportByYear(
    advertisingReport,
    taxSetting.year,
    isCrossYearPeriod,
  );

  var { weeklyFinancialReportByYear } = getWeeklyFinancialReportByYear(
    weeklyFinancialReport,
    taxSetting.year,
    isCrossYearPeriod,
  );

  var { parsedPaidStorageReport } = parsePaidStorageReport(storageReportByYear);

  var reportTotals = {};

  reportTotals.totalSold = calc.total.sold(weeklyFinancialReportByYear);

  reportTotals.totalStorageCost = calc.total.storageCost(
    weeklyFinancialReportByYear,
  );

  reportTotals.totalAdvertisingCosts = calc.total.advertisingCosts(
    advertisingReportByYear,
  );

  var skus = [];
  var { skuNamesFromWeeklyFinancialReport } =
    getSkuNamesFromWeeklyFinancialReport(weeklyFinancialReportByYear);

  for (var name of skuNamesFromWeeklyFinancialReport) {
    var skuFilteredReport = weeklyFinancialReportByYear.filter(
      (sku) => sku.vendorCode === name,
    );
    var skuStorageCost =
      parsedPaidStorageReport.find((item) => item.name === name)
        ?.skuStorageCost || 0;

    var { skuByYear } = getSkuByYear(
      skuFilteredReport,
      recalculatedTaxSetting.year,
    );

    var sku = await parseSku(
      name,
      skuNamesFromWeeklyFinancialReport.length,
      skuByYear,
      skuStorageCost,
      taxSetting.taxRate,
      reportTotals,
    );

    if (sku) {
      var { updatedTaxSettings } = recalculateSkuAndTaxSetting(
        sku,
        recalculatedTaxSetting,
      );

      recalculatedTaxSetting = Object.assign(
        recalculatedTaxSetting,
        updatedTaxSettings,
      );

      skus.push(sku);
    }

    skus = truncateSkuNums(skus);
  }

  return { skus, recalculatedTaxSetting };
};

export default processReportSkus;
