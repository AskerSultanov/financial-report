import calc from "../services/calcServices/index.js";
import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/collections/index.js";
import getPrevSkuData from "../services/different/getPrevSkuData.js";
import getPrevTotalsData from "../services/different/getPrevTotalsData.js";
import excludeEqualParams from "../services/different/excludeEqualParams.js";
import recalculateTaxParams from "../services/different/recalculateTaxParams.js";
import verifyAllSkusExistInReport from "../services/different/verifyAllSkusExistInReport.js";
import processOfSkuCostPriceSetting from "../services/different/processOfSkuCostPriceSetting.js";

var currentYearPostfix = "InCurrentYear";
var endYearPostfix = "InNextYear";

var { saveUpdatedReport, getReportById } = dbUtils.reportCollectionServices;
var { getTaxParamsFromDb, changeTaxParamsToDb } = dbUtils.taxParamsCollectionServices;
var { getListGoodsFromDb, updateSkusMetricsInListGoods } = dbUtils.goodsCollectionServices;

var setCostPriceToSkus = async (req, res, next) => {
  if (!req.body.costPrices.length) {
    return res.sendStatus(304);
  }

  var { userId, reportId, taxYear, costPrices } = req.body;

  var skuNames = costPrices.map(({ skuName }) => skuName);

  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      var { report } = await getReportById(userId, reportId);

      if (!report) {
        return res.sendStatus(404);
      }

      var { allSkusExist } = verifyAllSkusExistInReport(report.skus, skuNames);

      if (!allSkusExist) {
        return res.sendStatus(400);
      }

      var allTaxParams = await getTaxParamsFromDb(userId, null, session);
      var { listGoods } = await getListGoodsFromDb(userId, skuNames, session);

      var { skus, ...totalParams } = report;

      var startYear = +report.dateFrom.split("-")[0];
      var endYear = +report.dateTo.split("-")[0];

      var startYearTaxParams = allTaxParams.find((param) => param.year === startYear);
      var endYearTaxParams = allTaxParams.find((param) => param.year === endYear);
      var taxParamsOfYear = allTaxParams.find((param) => param.year === taxYear);

      var prevSkuData;
      var prevReportTotals = getPrevTotalsData(totalParams);

      var skusDataToClient = [];
      var skuMetricsToUpdate = [];

      for (var { id, skuName, lastCostPrice } of costPrices) {
        var skuFromListGoods = listGoods.find((sku) => sku.id === id && sku.skuName === skuName);

        var skuIndex = skus.findIndex((sku) => sku.id === id && sku.skuName === skuName);

        if (skuIndex === -1) {
          continue;
        }

        prevSkuData = getPrevSkuData(skus[skuIndex]);

        if (report.isCrossYearPeriod) {
          skus[skuIndex].costPrice = lastCostPrice;

          if (skus[skuIndex].costPriceInCurrentYear !== lastCostPrice) {
            skus[skuIndex].costPriceInCurrentYear = lastCostPrice;

            var resultOfStartYearUpdation = await processOfSkuCostPriceSetting(
              skus[skuIndex],
              skuFromListGoods,
              startYearTaxParams,
              prevSkuData,
              currentYearPostfix,
            );

            skus[skuIndex] = resultOfStartYearUpdation.updatedSku;
            startYearTaxParams = resultOfStartYearUpdation.taxParams;
            skuFromListGoods.metrics = resultOfStartYearUpdation.updatedSkuMetrics;

            totalParams = calc.total.restParams(totalParams, prevSkuData, skus[skuIndex], report.isCrossYearPeriod, currentYearPostfix).updatedTotals;

            startYearTaxParams = recalculateTaxParams(startYearTaxParams, prevReportTotals, totalParams, currentYearPostfix).recalculatedTaxParams;
          }

          if (skus[skuIndex].costPriceInNextYear !== lastCostPrice) {
            skus[skuIndex].costPriceInNextYear = lastCostPrice;

            var resultOfEndYearUpdation = await processOfSkuCostPriceSetting(
              skus[skuIndex],
              skuFromListGoods,
              endYearTaxParams,
              prevSkuData,
              endYearPostfix,
            );

            skus[skuIndex] = resultOfEndYearUpdation.updatedSku;
            endYearTaxParams = resultOfEndYearUpdation.taxParams;
            skuFromListGoods.metrics = resultOfEndYearUpdation.updatedSkuMetrics;

            totalParams = calc.total.restParams(totalParams, prevSkuData, skus[skuIndex], report.isCrossYearPeriod, endYearPostfix).updatedTotals;

            endYearTaxParams = recalculateTaxParams(endYearTaxParams, prevReportTotals, totalParams, endYearPostfix).recalculatedTaxParams;
          }

          skuMetricsToUpdate.push({ id, skuName, metrics: skuFromListGoods.metrics });
        } else {
          if (skus[skuIndex].costPrice !== lastCostPrice) {
            console.log({ updatedSku });
            var result = await processOfSkuCostPriceSetting(skus[skuIndex], skuFromListGoods, taxParamsOfYear, prevSkuData);
            skus[skuIndex] = result.updatedSku;

            totalParams = calc.total.restParams(totalParams, prevSkuData, skus[skuIndex]).updatedTotals;
            taxParamsOfYear = recalculateTaxParams(result.taxParams, prevReportTotals, totalParams).recalculatedTaxParams;

            skuMetricsToUpdate.push({ id, skuName, metrics: result.updatedSkuMetrics });
          }
        }

        var changedSkuData = excludeEqualParams(prevSkuData, skus[skuIndex]);

        skusDataToClient.push({
          skuIndex,
          year: taxYear,
          data: { ...changedSkuData },
        });
      }

      if (!skusDataToClient.length) {
        return res.sendStatus(409);
      }

      var years = [];
      var totalsDataToClient = excludeEqualParams(prevReportTotals, totalParams);

      if (report.isCrossYearPeriod) {
        years = [startYear, endYear];

        await changeTaxParamsToDb(userId, session, startYearTaxParams, endYearTaxParams);
      } else {
        await changeTaxParamsToDb(userId, session, taxParamsOfYear);
      }

      await updateSkusMetricsInListGoods(userId, skuMetricsToUpdate, session);
      await saveUpdatedReport(userId, reportId, { skus, ...totalParams }, session);

      res.json({ years, skusDataToClient, totals: { data: totalsDataToClient } });
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(304);
  } finally {
    if (session) {
      await session.endSession();
    }
  }
};

export default setCostPriceToSkus;
