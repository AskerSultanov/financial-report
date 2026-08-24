import calc from "../services/calcServices/index.js";
import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import getPrevSkuData from "../services/different/getPrevSkuData.js";
import excludeEqualParams from "../services/different/excludeEqualParams.js";
import recalculateTaxParams from "../services/different/recalculateTaxParams.js";

var { saveUpdatedReport, getSkuFromReport } = dbUtils.reportModelUtils;
var { getTaxParamsFromDb, changeTaxParamsToDb } = dbUtils.taxParamsModelUtils;

var setOtherExpensesToSku = async (req, res, next) => {
  var { userId, reportId, skuName, year, otherExpenses } = req.body;

  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      var { report } = await getSkuFromReport(userId, reportId, skuName, session);

      if (!report) {
        return res.sendStatus(404);
      }

      var sku;

      if (report.skus.length > 1) {
        sku = report.skus.find((sku) => sku.year === year);
      } else {
        sku = report.skus[0];
      }

      if (sku.otherExpenses === otherExpenses) {
        return res.sendStatus(409);
      }

      var prevSkuData = getPrevSkuData(sku);
      var taxParams = await getTaxParamsFromDb(userId, year, session);

      sku.otherExpenses = otherExpenses;

      var { updatedSkuFields, updatedTaxParamsFieldsBySku } = calc.sku.restParams(sku, prevSkuData, taxParams);
      var updatedSkus = [{ skuName, data: updatedSkuFields }];

      var { updatedTaxParamsField } = recalculateTaxParams(updatedTaxParamsFieldsBySku, prevSkuData, updatedSkuFields);
      updatedTaxParamsField.year = year;

      await changeTaxParamsToDb(userId, session, updatedTaxParamsField);
      await saveUpdatedReport(userId, reportId, updatedSkus, session);

      var years = [];
      var skuDataToClient = excludeEqualParams(prevSkuData, updatedSkuFields);

      if (report.isCrossYearPeriod) {
        var requiredYear = year === startYear ? startYear : endYear;
        years = [requiredYear];
      }

      return res.status(200).json({
        years,
        sku: { year, data: skuDataToClient },
      });
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(304);
  } finally {
    if (session) {
      await session.endSession();
    }
  }
};

export default setOtherExpensesToSku;
