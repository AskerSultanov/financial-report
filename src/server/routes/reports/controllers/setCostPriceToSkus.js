import calc from "../services/calcServices/index.js";
import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import getPrevSkuData from "../services/different/getPrevSkuData.js";
import excludeEqualParams from "../services/different/excludeEqualParams.js";
import recalculateTaxParams from "../services/different/recalculateTaxParams.js";
import verifyAllSkusExistInReport from "../services/different/verifyAllSkusExistInReport.js";

var { updateSkusInListGoods } = dbUtils.goodsModelUtils;
var { saveUpdatedReport, getSkusFromReport } = dbUtils.reportModelUtils;
var { getTaxParamsFromDb, changeTaxParamsToDb } = dbUtils.taxParamsModelUtils;

var setCostPriceToSkus = async (req, res, next) => {
  if (!req.body.costPrices.length) {
    return res.sendStatus(400);
  }

  var { userId, reportId, year, costPrices } = req.body;

  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      var skuNames = costPrices.map(({ skuName }) => skuName);

      var { report } = await getSkusFromReport(userId, reportId, skuNames, session);

      if (!report) {
        return res.sendStatus(404);
      }

      var { allSkusExist } = verifyAllSkusExistInReport(report.skus, skuNames);

      if (!allSkusExist) {
        return res.sendStatus(400);
      }

      var taxParams = await getTaxParamsFromDb(userId, year, session);

      var { skus } = report;

      var updatedSkus = [];
      var skusDataToClient = [];
      var updatedSkusToListGoods = [];

      for (var { skuName, lastCostPrice } of costPrices) {
        var skuIndex = skus.findIndex((sku) => sku.skuName === skuName);

        var sku = skus[skuIndex];

        if (sku.year !== year) {
          continue;
        }

        var prevSkuData = getPrevSkuData(sku);

        sku.costPrice = lastCostPrice;

        var { updatedSkuFields, updatedTaxParamsFieldsBySku } = calc.sku.restParams(sku, prevSkuData, taxParams);
        var { updatedTaxParamsField } = recalculateTaxParams(updatedTaxParamsFieldsBySku, prevSkuData, updatedSkuFields);

        taxParams = Object.assign(taxParams, updatedTaxParamsField);

        updatedSkus.push({ skuName, data: updatedSkuFields });
        updatedSkusToListGoods.push({ skuName, data: { lastCostPrice } });

        skusDataToClient.push({
          skuName,
          year: year,
          data: { ...updatedSkuFields },
        });
      }

      if (!skusDataToClient.length) {
        return res.sendStatus(409);
      }

      var years = [year];

      await changeTaxParamsToDb(userId, session, taxParams);
      await saveUpdatedReport(userId, reportId, updatedSkus, session);
      await updateSkusInListGoods(userId, updatedSkusToListGoods, session);

      return res.json({ years, skusDataToClient });
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
