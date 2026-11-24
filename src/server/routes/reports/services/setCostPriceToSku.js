import calc from "./utils/calcUtils/index.js";
import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import getPrevSkuData from "./utils/different/getPrevSkuData.js";
import excludeEqualParams from "./utils/different/excludeEqualParams.js";
import recalculateTaxSetting from "./utils/different/recalculateTaxSetting.js";

var { updateSkuInListGoods } = dbUtils.goodsModelUtils;
var { getSkuFromReport, updateSkus } = dbUtils.skuModelUtils;
var { getTaxSettingByYear, updateTaxSettings } = dbUtils.taxSettingModelUtils;

var setCostPriceToSkuService = async (data) => {
  var { userId, reportId, skuName, year, costPrice } = data;

  var session = await dbClient.startSession();

  return await session.withTransaction(async () => {
    var { skuFromReport } = await getSkuFromReport(
      userId,
      reportId,
      skuName,
      year,
      session,
    );

    if (!skuFromReport) {
      return {
        reportNotFound: true,
        updatedSkuData: {},
        costPriceIsEqual: false,
        hasNoSales: false,
      };
    }

    var hasNoSales = skuFromReport.profit === 0 || skuFromReport.qty === 0;

    if (hasNoSales) {
      return {
        hasNoSales,
        costPriceIsEqual: true,
        reportNotFound: false,
        updatedSkuData: {},
      };
    }

    if (skuFromReport.costPrice === costPrice) {
      return {
        costPriceIsEqual: true,
        reportNotFound: false,
        updatedSkuData: {},
        hasNoSales: false,
      };
    }

    var { taxSetting } = await getTaxSettingByYear(userId, year, session);

    var prevSkuData = getPrevSkuData(skuFromReport);

    skuFromReport.costPrice = costPrice;

    var { updatedSkuFields, updatedTaxSettingFieldsBySku } =
      calc.sku.restParams(skuFromReport, prevSkuData, taxSetting);

    var updatedSkus = [{ reportId, skuName, year, data: updatedSkuFields }];

    var { updatedTaxSettingField } = recalculateTaxSetting(
      updatedTaxSettingFieldsBySku,
      prevSkuData,
      updatedSkuFields,
    );

    var updatedTaxSettings = [{ year, data: updatedTaxSettingField }];

    await updateSkus(userId, updatedSkus, session);
    await updateTaxSettings(userId, updatedTaxSettings, session);
    await updateSkuInListGoods(
      userId,
      skuName,
      { lastCostPrice: costPrice },
      session,
    );

    var skuDataToClient = excludeEqualParams(prevSkuData, updatedSkuFields);

    return {
      hasNoSales: false,
      costPriceIsEqual: false,
      reportNotFound: false,
      updatedSkuData: {
        updatedSku: skuDataToClient,
      },
    };
  });
};

export default setCostPriceToSkuService;
