import calc from "../services/calcServices/index.js";
import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/collections/index.js";
import getPrevSkuData from "../services/different/getPrevSkuData.js";
import getPrevTotalsData from "../services/different/getPrevTotalsData.js";
import recalculateParams from "../services/different/recalculateParams.js";
import excludeEqualParams from "../services/different/excludeEqualParams.js";
import recalculateTaxParams from "../services/different/recalculateTaxParams.js";
import verifyAllSkusExistInReport from "../services/different/verifyAllSkusExistInReport.js";
import processOfSkuCostPriceSetting from "../services/different/processOfSkuCostPriceSetting.js";

var selectedFields = ["id", "skuName"];

var currentYearPostfix = "InCurrentYear";
var endYearPostfix = "InNextYear";

var { saveUpdatedReportNew, getReportById } = dbUtils.reportCollectionServices;
var { getTaxParamsFromDb, changeTaxParamsToDb } = dbUtils.taxParamsCollectionServices;
var { getListGoodsFromDb, updateSkusFields, saveNewSkusToDb } = dbUtils.goodsCollectionServices;

var setCostPriceToSkus = async (req, res, next) => {
  if (!req.body.costPrices.length) {
    return res.sendStatus(400);
  }

  return res.sendStatus(200);
  var { userId, reportId, taxYear, costPrices } = req.body;

  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      var { report } = await getReportById(userId, reportId);

      if (!report) {
        return res.sendStatus(404);
      }

      var skuNames = costPrices.map(({ skuName }) => skuName);
      var { allSkusExist } = verifyAllSkusExistInReport(report.skus, skuNames);

      if (!allSkusExist) {
        return res.sendStatus(400);
      }

      var taxParams = await getTaxParamsFromDb(userId, taxYear, session);

      var { skus, ...reportTotals } = report;

      var postfix = "";
      var startYear = +report.dateFrom.split("-")[0];
      var endYear = +report.dateTo.split("-")[0];

      if (report.isCrossYearPeriod) {
        postfix = taxYear === startYear ? currentYearPostfix : endYearPostfix;
      }

      var updatedSkus = [];
      var skusDataToClient = [];
      var updatedSkusToListGoods = [];
      var updatedTotalsAccumulator = {};
      var prevUpdatedTotalsAccumulator = null;
      var prevReportTotals = getPrevTotalsData(reportTotals);

      for (var { id, skuName, lastCostPrice } of costPrices) {
        var skuIndex = skus.findIndex((sku) => sku.id === id && sku.skuName === skuName);

        var sku = skus[skuIndex];
        var prevSkuData = getPrevSkuData(sku);

        sku.costPrice = lastCostPrice;

        var { updatedSkuFields, updatedTaxParamsFieldsBySku } = processOfSkuCostPriceSetting(sku, taxParams, prevSkuData, postfix);
        var { updatedTotals } = calc.total.restParams(reportTotals, prevSkuData, updatedSkuFields, report.isCrossYearPeriod, postfix);
        var { updatedTaxParamsField } = recalculateTaxParams(updatedTaxParamsFieldsBySku, prevReportTotals, updatedTotals, postfix);

        reportTotals = Object.assign(reportTotals, updatedTotals);
        prevReportTotals = Object.assign({}, reportTotals);
        taxParams = Object.assign(taxParams, updatedTaxParamsField);

        updatedSkus.push({ skuName, data: updatedSkuFields });
        updatedSkusToListGoods.push({ skuName, data: { lastCostPrice } });

        skusDataToClient.push({
          skuIndex,
          year: taxYear,
          data: { ...updatedSkuFields },
        });
      }

      if (!skusDataToClient.length) {
        return res.sendStatus(409);
      }

      var years = [taxYear];
      var totalsDataToClient = excludeEqualParams(prevReportTotals, updatedTotals);

      await changeTaxParamsToDb(userId, session, taxParams);
      await saveUpdatedReportNew(userId, reportId, updatedTotals, updatedSkus, session);

      var { listGoods } = await getListGoodsFromDb(userId, skuNames, selectedFields, session);

      var newSkusToListGoods = [];

      for (var { id, skuName, lastCostPrice } of costPrices) {
        var skuExistInListGoods = listGoods.find((sku) => sku.skuName === skuName);

        if (!skuExistInListGoods) {
          var newSkuToListGoods = { id, skuName, lastCostPrice };
          newSkusToListGoods.push(newSkuToListGoods);
        }
      }

      if (newSkusToListGoods.length) {
        await saveNewSkusToDb(userId, newSkusToListGoods, session);
      }

      await updateSkusFields(userId);

      return res.json({ years, skusDataToClient, totals: { data: updatedTotals } });
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
