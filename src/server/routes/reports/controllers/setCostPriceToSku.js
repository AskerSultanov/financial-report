import calc from "../services/calcServices/index.js";
import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/collections/index.js";
import getPrevSkuData from "../services/different/getPrevSkuData.js";
import excludeEqualParams from "../services/different/excludeEqualParams.js";
import recalculateTaxParams from "../services/different/recalculateTaxParams.js";

var { updateSkuInListGoods } = dbUtils.goodsCollectionServices;
var { getTaxParamsFromDb, changeTaxParamsToDb } = dbUtils.taxParamsCollectionServices;
var { saveUpdatedReport, getSkuFromReport, getReportById } = dbUtils.reportCollectionServices;

var setCostPriceToSku = async (req, res, next) => {
  var { userId, reportId, skuName, year, costPrice } = req.body;
  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      var { report } = await getSkuFromReport(userId, reportId, skuName, session);

      if (!report) {
        return res.sendStatus(404);
      }

      var sku = report.skus[0];

      if (sku.costPrice === costPrice) {
        return res.sendStatus(409);
      }

      var taxParams = await getTaxParamsFromDb(userId, year, session);

      var prevSkuData = getPrevSkuData(sku);

      sku.costPrice = costPrice;

      var { updatedSkuFields, updatedTaxParamsFieldsBySku } = calc.sku.restParams(sku, prevSkuData, taxParams);

      var updatedSkus = [{ skuName, data: updatedSkuFields }];

      var { updatedTaxParamsField } = recalculateTaxParams(updatedTaxParamsFieldsBySku, prevSkuData, updatedSkuFields);
      updatedTaxParamsField.year = year;

      await changeTaxParamsToDb(userId, session, updatedTaxParamsField);
      await saveUpdatedReport(userId, reportId, updatedSkus, session);
      await updateSkuInListGoods(userId, skuName, { lastCostPrice: costPrice }, session);

      var years = [];
      var skuDataToClient = excludeEqualParams(prevSkuData, updatedSkuFields);

      if (report.isCrossYearPeriod) {
        var startYear = +report.dateFrom.split("-")[0];
        var endYear = +report.dateTo.split("-")[0];
        var requiredYear = year === startYear ? startYear : endYear;
        years = [requiredYear];
      }

      return res.json({
        years,
        sku: { year, skuName, data: skuDataToClient },
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
