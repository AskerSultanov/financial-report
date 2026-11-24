import calc from "./utils/calcUtils/index.js";
import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import getPrevSkuData from "./utils/different/getPrevSkuData.js";
import excludeEqualParams from "./utils/different/excludeEqualParams.js";
import recalculateTaxSetting from "./utils/different/recalculateTaxSetting.js";

var { getSkuFromReport, updateSkus } = dbUtils.skuModelUtils;
var { getTaxSettingByYear, updateTaxSettings } = dbUtils.taxSettingModelUtils;

var setOtherExpensesToSkuService = async (data) => {
  var { userId, reportId, skuName, year, otherExpenses } = data;

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

    if (skuFromReport.otherExpenses === otherExpenses) {
      return {
        otherExpensesIsEqual: true,
        reportNotFound: false,
        updatedSkuData: {},
      };
    }

    var prevSkuData = getPrevSkuData(skuFromReport);
    var { taxSetting } = await getTaxSettingByYear(userId, year, session);

    skuFromReport.otherExpenses = otherExpenses;

    var { updatedSkuFields, updatedTaxSettingFieldsBySku } =
      calc.sku.restParams(skuFromReport, prevSkuData, taxSetting);

    var updatedSkus = [{ skuName, year, reportId, data: updatedSkuFields }];

    var { updatedTaxSettingField } = recalculateTaxSetting(
      updatedTaxSettingFieldsBySku,
      prevSkuData,
      updatedSkuFields,
    );

    var updatedTaxSettings = [{ year, data: updatedTaxSettingField }];

    await updateSkus(userId, updatedSkus, session);
    await updateTaxSettings(userId, updatedTaxSettings, session);

    var skuDataToClient = excludeEqualParams(prevSkuData, updatedSkuFields);

    return {
      otherExpensesIsEqual: false,
      reportNotFound: false,
      updatedSkuData: {
        updatedSku: skuDataToClient,
      },
    };
  });
};

export default setOtherExpensesToSkuService;
