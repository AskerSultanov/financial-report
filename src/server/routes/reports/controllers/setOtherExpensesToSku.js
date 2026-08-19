import calc from "../services/calcServices/index.js";
import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/collections/index.js";
import truncateNum from "../services/reportParsing/truncateNum.js";
import getPrevSkuData from "../services/different/getPrevSkuData.js";
import getPrevTotalsData from "../services/different/getPrevTotalsData.js";
import excludeEqualParams from "../services/different/excludeEqualParams.js";
import recalculateTaxParams from "../services/different/recalculateTaxParams.js";
import processOfSkuCostPriceSetting from "../services/different/processOfSkuCostPriceSetting.js";


var currentYearPostfix = "InCurrentYear";
var endYearPostfix = "InNextYear";

var { saveUpdatedReportNew, getReportById } = dbUtils.reportCollectionServices;
var { getTaxParamsFromDb, changeTaxParamsToDb } = dbUtils.taxParamsCollectionServices;

var setOtherExpensesToSku = async (req, res, next) => {
  var { userId, reportId, skuIndex, skuName, skuId, year } = req.body;

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

      var postfix = "";
      var startYear = +report.dateFrom.split("-")[0];
      var endYear = report.dateTo.split("-")[0];

      if (report.isCrossYearPeriod) {
        postfix = year === startYear ? currentYearPostfix : endYearPostfix;
      }

      var otherExpensesKey = "otherExpenses" + postfix;
      var sku = skus[skuIndex];

      if (sku[otherExpensesKey] === req.body[otherExpensesKey]) {
        return res.sendStatus(409);
      }

      var prevSkuData = getPrevSkuData(skus[skuIndex]);
      var prevReportTotals = getPrevTotalsData(totalParams);
      var taxParams = await getTaxParamsFromDb(userId, year, session);

      sku[otherExpensesKey] = req.body[otherExpensesKey];

      var { updatedSkuFields, updatedTaxParamsFieldsBySku } = processOfSkuCostPriceSetting(sku, taxParams, prevSkuData, postfix);
      var updatedSkus = [{ skuName, data: updatedSkuFields }];

      var { updatedTotals } = calc.total.restParams(totalParams, prevSkuData, updatedSkuFields, report.isCrossYearPeriod, postfix);
      var { updatedTaxParamsField } = recalculateTaxParams(updatedTaxParamsFieldsBySku, prevReportTotals, updatedTotals, postfix);
      updatedTaxParamsField.year = year;

      await changeTaxParamsToDb(userId, session, updatedTaxParamsField);
      await saveUpdatedReportNew(userId, reportId, updatedTotals, updatedSkus, session);

      var years = [];
      var skuDataToClient = excludeEqualParams(prevSkuData, updatedSkuFields);
      var totalsDataToClient = excludeEqualParams(prevReportTotals, updatedTotals);

      if (report.isCrossYearPeriod) {
        var requiredYear = year === startYear ? startYear : endYear;
        years = [requiredYear];
      }

      return res.status(200).json({
        years,
        totals: { data: totalsDataToClient },
        sku: { year, skuIndex, data: skuDataToClient },
      });
    });
  } catch (e) {
    console.log(e);
    await session.abortTransaction();
    return res.sendStatus(304);
  } finally {
    if (session) {
      await session.endSession();
    }
  }
};

export default setOtherExpensesToSku;
