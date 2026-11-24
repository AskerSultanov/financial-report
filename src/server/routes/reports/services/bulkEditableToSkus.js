import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import calcUtils from "../services/utils/calcUtils/index.js";
import getPrevSkuData from "./utils/different/getPrevSkuData.js";
import recalculateTaxSetting from "./utils/different/recalculateTaxSetting.js";

var { updateSkusInListGoods } = dbUtils.goodsModelUtils;
var { getSkusFromReport, updateSkus } = dbUtils.skuModelUtils;
var { getTaxSettingByYear, updateTaxSettings } = dbUtils.taxSettingModelUtils;

var bulkEditableToSkusService = async (data) => {
  var { userId, reportId, updateField, newValue, skusToUpdate } = data;

  if (!skusToUpdate.length) {
    return { invalidData: true, updatedSkus: [], reportNotFound: false };
  }

  var session = await dbClient.startSession();

  return await session.withTransaction(async () => {
    var { year } = skusToUpdate[0];
    var skuNames = skusToUpdate.map(({ skuName }) => skuName);

    var { skusFromReport } = await getSkusFromReport(
      userId,
      reportId,
      skuNames,
      year,
      session,
    );

    if (!skusFromReport.length) {
      return { invalidData: true, updatedSkus: [], reportNotFound: false };
    }

    var { taxSetting } = await getTaxSettingByYear(userId, year, session);

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

        var { updatedSkuFields, updatedTaxSettingFieldsBySku } =
          calcUtils.sku.restParams(requiredSku, prevSkuData, taxSetting);

        var { updatedTaxSettingField } = recalculateTaxSetting(
          updatedTaxSettingFieldsBySku,
          prevSkuData,
          updatedSkuFields,
        );

        taxSetting = Object.assign(taxSetting, updatedTaxSettingField);

        updatedSkusToClient.push({ skuName, year, data: updatedSkuFields });
        updatedSkus.push({ skuName, reportId, year, data: updatedSkuFields });
      }
    }

    if (!updatedSkus.length) {
      return { invalidData: true, updatedSkus: [], reportNotFound: false };
    }

    var updatedTaxSettings = [{ year, data: taxSetting }];

    await updateSkus(userId, updatedSkus, session);
    await updateTaxSettings(userId, updatedTaxSettings, session);

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
