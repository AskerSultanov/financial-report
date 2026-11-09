import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import calcUtils from "../services/utils/calcUtils/index.js";
import getPrevSkuData from "./utils/different/getPrevSkuData.js";
import recalculateTaxParams from "./utils/different/recalculateTaxParams.js";

var { updateSkusInListGoods } = dbUtils.goodsModelUtils;
var { getSkusFromReport, saveUpdatedReport } = dbUtils.reportModelUtils;
var { getTaxParamsFromDb, updateTaxParamsToDb } = dbUtils.taxParamsModelUtils;

var bulkEditableToSkusService = async (data) => {
  var { userId, reportId, updateField, newValue, skusToUpdate } = data;

  if (!skusToUpdate.length) {
    return { invalidData: true, updatedSkus: [], reportNotFound: false };
  }

  var session = await dbClient.startSession();

  return await session.withTransaction(async () => {
    var skuNames = skusToUpdate.map(({ skuName }) => skuName);

    var { report } = await getSkusFromReport(
      userId,
      reportId,
      skuNames,
      session,
    );

    var { year } = skusToUpdate[0];
    var taxParams = await getTaxParamsFromDb(userId, year, session);

    var updatedSkus = [];

    for (var { year, skuName } of skusToUpdate) {
      var requiredSku = report.skus.find(
        (sku) => sku.year === year && sku.skuName === skuName,
      );

      if (requiredSku) {
        var isEqual = newValue === requiredSku[updateField];

        if (isEqual) {
          continue;
        }

        var hasNoSales = requiredSku.profit === 0 || requiredSku.qty === 0;

        if (hasNoSales) {
          continue;
        }

        var prevSkuData = getPrevSkuData(requiredSku);

        requiredSku[updateField] = newValue;

        var { updatedSkuFields, updatedTaxParamsFieldsBySku } =
          calcUtils.sku.restParams(requiredSku, prevSkuData, taxParams);

        var { updatedTaxParamsField } = recalculateTaxParams(
          updatedTaxParamsFieldsBySku,
          prevSkuData,
          updatedSkuFields,
        );

        taxParams = Object.assign(taxParams, updatedTaxParamsField);

        updatedSkus.push({ year, skuName, data: updatedSkuFields });
      }
    }

    if (!updatedSkus) {
      return { invalidData: true, updatedSkus: [], reportNotFound: false };
    }

    var updatedTaxParams = [{ year, data: taxParams }];

    await updateTaxParamsToDb(userId, updatedTaxParams, session);
    await saveUpdatedReport(userId, reportId, updatedSkus, session);

    if (updateField === "costPrice") {
      var updatedSkusToListGoods = skusToUpdate.map((item) => {
        item.data = { lastCostPrice: newValue };
        return item;
      });

      await updateSkusInListGoods(userId, updatedSkusToListGoods, session);
    }

    return {
      updatedSkus,
      invalidData: false,
      reportNotFound: false,
    };
  });
};

export default bulkEditableToSkusService;
