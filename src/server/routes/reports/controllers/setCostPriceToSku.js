import calc from "../services/calcServices/index.js";
import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/collections/index.js";
import getPrevSkuData from "../services/different/getPrevSkuData.js";
import getPrevTotalsData from "../services/different/getPrevTotalsData.js";
import excludeEqualParams from "../services/different/excludeEqualParams.js";
import recalculateTaxParams from "../services/different/recalculateTaxParams.js";
import processOfSkuCostPriceSetting from "../services/different/processOfSkuCostPriceSetting.js";

var currentYearPostfix = "InCurrentYear";
var endYearPostfix = "InNextYear";

var { saveUpdatedReport, getReportById } = dbUtils.reportCollectionServices;
var { updateSkuInListGoods, getSkuFromListGoods } = dbUtils.goodsCollectionServices;
var { getTaxParamsFromDb, changeTaxParamsToDb } = dbUtils.taxParamsCollectionServices;

var setCostPriceToSku = async (req, res, next) => {
  var { userId, reportId, skuIndex, skuId, skuName, year } = req.body;

  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      var { report } = await getReportById(userId, reportId, session);

      if (!report) {
        return res.sendStatus(404);
      }

      var { skus, ...totalParams } = report;

      if (skus[skuIndex].skuName !== skuName) {
        var expectedSkuIndex = skus.findIndex((sku) => sku.skuName === skuName);

        if (expectedSkuIndex === -1) {
          return res.sendStatus(400);
        }

        skuIndex = expectedSkuIndex;
      }

      var taxParams = await getTaxParamsFromDb(userId, year, session);
      var { skuFromListGoods } = await getSkuFromListGoods(userId, skuId, skuName, session);

      var postfix = "";
      var startYear = +report.dateFrom.split("-")[0];
      var endYear = report.dateTo.split("-")[0];

      if (report.isCrossYearPeriod) {
        postfix = year === startYear ? currentYearPostfix : endYearPostfix;
      }

      if (skus[skuIndex]["costPrice" + postfix] === req.body["costPrice" + postfix]) {
        return res.sendStatus(409);
      }

      var prevSkuData = getPrevSkuData(skus[skuIndex]);
      var prevReportTotals = getPrevTotalsData(totalParams);

      skus[skuIndex]["costPrice" + postfix] = req.body["costPrice" + postfix];

      if (report.isCrossYearPeriod) {
        var result = await processOfSkuCostPriceSetting(skus[skuIndex], skuFromListGoods, taxParams, prevSkuData, postfix);
        skus[skuIndex] = result.updatedSku;

        totalParams = calc.total.restParams(totalParams, prevSkuData, skus[skuIndex], report.isCrossYearPeriod, postfix).updatedTotals;

        taxParams = recalculateTaxParams(taxParams, prevReportTotals, totalParams, postfix).recalculatedTaxParams;
      } else {
        var result = await processOfSkuCostPriceSetting(skus[skuIndex], skuFromListGoods, taxParams, prevSkuData, postfix);

        skus[skuIndex] = result.updatedSku;

        totalParams = calc.total.restParams(totalParams, prevSkuData, skus[skuIndex], report.isCrossYearPeriod, postfix).updatedTotals;

        taxParams = recalculateTaxParams(result.taxParams, prevReportTotals, totalParams, postfix).recalculatedTaxParams;
      }

      var metrics = result.updatedSkuMetrics;
      var lastCostPrice = req.body["costPrice" + postfix];

      await changeTaxParamsToDb(userId, session, taxParams);
      await saveUpdatedReport(userId, reportId, { skus, ...totalParams }, session);

      if (metrics.length) {
        await updateSkuInListGoods(userId, skuId, skuName, { lastCostPrice, metrics }, session);
      }

      var years = [];
      var skuDataToClient = excludeEqualParams(prevSkuData, skus[skuIndex]);
      var totalsDataToClient = excludeEqualParams(prevReportTotals, totalParams);

      if (report.isCrossYearPeriod) {
        var requiredYear = year === startYear ? startYear : endYear;
        years = [requiredYear];
      }

      var sku = skus[skuIndex];

      return res.json({
        years,
        totals: { data: totalsDataToClient },
        sku: { year, skuIndex, data: skuDataToClient },
      });
    });
  } catch (err) {
    console.log(err);
    //log error
    return res.sendStatus(304);
  } finally {
    if (session) {
      await session.endSession();
    }
  }
};

export default setCostPriceToSku;
