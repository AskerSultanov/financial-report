import calc from "./utils/calcUtils/index.js";
import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import getPrevSkuData from "./utils/different/getPrevSkuData.js";
import recalculateTaxSetting from "./utils/different/recalculateTaxSetting.js";
import verifyAllSkusExistInReport from "./utils/different/verifyAllSkusExistInReport.js";

var { updateSkusInListGoods } = dbUtils.goodsModelUtils;
var { getSkusFromReport, updateSkus } = dbUtils.skuModelUtils;
var { getTaxSettingsByYears, updateTaxSettings } = dbUtils.taxSettingModelUtils;

var setCostPriceToSkusService = async (data) => {
  var { userId, reportId, year, costPrices } = data;

  var session = await dbClient.startSession();

  return await session.withTransaction(async () => {
    var skuNames = costPrices.map(({ skuName }) => skuName);

    var { skusFromReport } = await getSkusFromReport(
      userId,
      reportId,
      skuNames,
      year,
      session,
    );

    if (!skusFromReport.length) {
      return {
        updatedSkus: [],
        reportNotFound: true,
        dataIsInvalid: false,
      };
    }

    var { allSkusExist } = verifyAllSkusExistInReport(skusFromReport, skuNames);

    if (!allSkusExist) {
      return {
        updatedSkus: [],
        dataIsInvalid: true,
        reportNotFound: false,
      };
    }

    var { taxSettings } = await getTaxSettingsByYears(userId, session);

    var updatedSkus = [];
    var updatedSkusToClient = [];
    var updatedSkusToListGoods = [];

    for (var { skuName, lastCostPrice } of costPrices) {
      var skuIndex = skusFromReport.findIndex((sku) => sku.skuName === skuName);

      var sku = skusFromReport[skuIndex];

      var hasNoSales = sku.profit === 0 || sku.qty === 0;

      if (hasNoSales) {
        continue;
      }

      if (sku.year !== year) {
        continue;
      }

      var prevSkuData = getPrevSkuData(sku);

      sku.costPrice = lastCostPrice;

      var { updatedSkuFields, updatedTaxSettingFieldsBySku } =
        calc.sku.restParams(sku, prevSkuData, taxSettings);

      var { updatedTaxSettingField } = recalculateTaxSetting(
        updatedTaxSettingFieldsBySku,
        prevSkuData,
        updatedSkuFields,
      );

      taxSettings = Object.assign(taxSettings, updatedTaxSettingField);

      updatedSkus.push({
        skuName,
        reportId,
        year: sku.year,
        data: updatedSkuFields,
      });

      updatedSkusToListGoods.push({
        skuName,
        year: sku.year,
        data: { lastCostPrice },
      });

      updatedSkusToClient.push({
        skuName,
        year: sku.year,
        data: updatedSkuFields,
      });
    }

    if (!updatedSkusToClient.length) {
      return {
        updatedSkus: [],
        dataIsInvalid: true,
        reportNotFound: false,
      };
    }

    var updatedTaxSettings = [{ year, data: taxSettings }];

    await updateSkus(userId, updatedSkus, session);
    await updateTaxSettings(userId, updatedTaxSettings, session);
    await updateSkusInListGoods(userId, updatedSkusToListGoods, session);

    return {
      dataIsInvalid: false,
      reportNotFound: false,
      updatedSkus: updatedSkusToClient,
    };
  });
};

export default setCostPriceToSkusService;
