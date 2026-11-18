import calc from "./utils/calcUtils/index.js";
import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import getPrevSkuData from "./utils/different/getPrevSkuData.js";
import excludeEqualParams from "./utils/different/excludeEqualParams.js";
import recalculateTaxParams from "./utils/different/recalculateTaxParams.js";

var { getSkuFromReport, updateSkus } = dbUtils.skuModelUtils;
var { getTaxParamsFromDb, updateTaxParamsToDb } = dbUtils.taxParamsModelUtils;

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
    var taxParams = await getTaxParamsFromDb(userId, year, session);

    skuFromReport.otherExpenses = otherExpenses;

    var { updatedSkuFields, updatedTaxParamsFieldsBySku } = calc.sku.restParams(
      skuFromReport,
      prevSkuData,
      taxParams,
    );

    var updatedSkus = [{ skuName, year, reportId, data: updatedSkuFields }];

    var { updatedTaxParamsField } = recalculateTaxParams(
      updatedTaxParamsFieldsBySku,
      prevSkuData,
      updatedSkuFields,
    );

    var updatedTaxParams = [{ year, data: updatedTaxParamsField }];

    await updateSkus(userId, updatedSkus, session);
    await updateTaxParamsToDb(userId, updatedTaxParams, session);

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
