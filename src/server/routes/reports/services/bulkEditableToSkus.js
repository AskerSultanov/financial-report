import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import calcUtils from "../services/utils/calcUtils/index.js";
import getPrevSkuData from "./utils/different/getPrevSkuData.js";
import recalculateTaxParams from "./utils/different/recalculateTaxParams.js";

var { updateSkusInListGoods } = dbUtils.goodsModelUtils;
var { getSkusFromReport, updateSkus } = dbUtils.skuModelUtils;
var { getTaxParamsFromDb, updateTaxParamsToDb } = dbUtils.taxParamsModelUtils;

var bulkEditableToSkusService = async (data) => {
  var { userId, reportId, updateField, newValue, skusToUpdate } = data;

  if (!skusToUpdate.length) {
    return { invalidData: true, updatedSkus: [], reportNotFound: false };
  }

  var session = await dbClient.startSession();

  return await session.withTransaction(async () => {
    var skuNames = skusToUpdate.map(({ skuName }) => skuName);

    var { skusFromReport } = await getSkusFromReport(
      userId,
      reportId,
      skuNames,
      session,
    );

    if (!skusFromReport.length) {
      return { invalidData: true, updatedSkus: [], reportNotFound: false };
    }

    var { year } = skusToUpdate[0];
    var taxParams = await getTaxParamsFromDb(userId, year, session);

    var updatedSkus = [];
    var updatedSkusToClient = [];

    for (var { year, skuName } of skusToUpdate) {
      var findSkuCb = (sku) => sku.year === year && sku.skuName === skuName;

      var requiredSku = skusFromReport.find(findSkuCb);

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

        updatedSkusToClient.push({ skuName, year, data: updatedSkuFields });
        updatedSkus.push({ skuName, reportId, year, data: updatedSkuFields });
      }
    }

    if (!updatedSkus.length) {
      return { invalidData: true, updatedSkus: [], reportNotFound: false };
    }

    var updatedTaxParams = [{ year, data: taxParams }];

    await updateSkus(userId, updatedSkus, session);
    await updateTaxParamsToDb(userId, updatedTaxParams, session);

    if (updateField === "costPrice") {
      var updatedSkusToListGoods = skusToUpdate.map((item) => {
        item.data = { lastCostPrice: newValue };
        return item;
      });

      await updateSkusInListGoods(userId, updatedSkusToListGoods, session);
    }

    return {
      invalidData: false,
      reportNotFound: false,
      updatedSkus: updatedSkusToClient,
    };
  });
};

export default bulkEditableToSkusService;
