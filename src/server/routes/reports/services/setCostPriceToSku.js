import calc from "./utils/calcUtils/index.js";
import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import getPrevSkuData from "./utils/different/getPrevSkuData.js";
import excludeEqualParams from "./utils/different/excludeEqualParams.js";
import recalculateTaxParams from "./utils/different/recalculateTaxParams.js";

var { updateSkuInListGoods } = dbUtils.goodsModelUtils;
var { saveUpdatedReport, getSkuFromReport } = dbUtils.reportModelUtils;
var { getTaxParamsFromDb, updateTaxParamsToDb } = dbUtils.taxParamsModelUtils;

var setCostPriceToSkuService = async (data) => {
  var { userId, reportId, skuName, year, costPrice } = data;

  var session = await dbClient.startSession();

  return await session.withTransaction(async () => {
    var { report } = await getSkuFromReport(userId, reportId, skuName, session);

    if (!report) {
      return {
        reportNotFound: true,
        updatedSkuData: {},
        costPriceIsEqual: false,
        hasNoSales: false,
      };
    }

    var sku;

    if (report.skus.length > 1) {
      sku = report.skus.find((sku) => sku.year === year);
    } else {
      sku = report.skus[0];
    }

    var hasNoSales = sku.profit === 0 || sku.qty === 0;

    if (hasNoSales) {
      return {
        hasNoSales,
        costPriceIsEqual: true,
        reportNotFound: false,
        updatedSkuData: {},
      };
    }

    if (sku.costPrice === costPrice) {
      return {
        costPriceIsEqual: true,
        reportNotFound: false,
        updatedSkuData: {},
        hasNoSales: false,
      };
    }

    var taxParams = await getTaxParamsFromDb(userId, year, session);

    var prevSkuData = getPrevSkuData(sku);

    sku.costPrice = costPrice;

    var { updatedSkuFields, updatedTaxParamsFieldsBySku } = calc.sku.restParams(
      sku,
      prevSkuData,
      taxParams,
    );

    var updatedSkus = [{ skuName, year: sku.year, data: updatedSkuFields }];

    var { updatedTaxParamsField } = recalculateTaxParams(
      updatedTaxParamsFieldsBySku,
      prevSkuData,
      updatedSkuFields,
    );

    var updatedTaxParams = [{ year, data: updatedTaxParamsField }];

    await updateTaxParamsToDb(userId, updatedTaxParams, session);
    await saveUpdatedReport(userId, reportId, updatedSkus, session);
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
        isCrossYearPeriod: report.isCrossYearPeriod,
      },
    };
  });
};

export default setCostPriceToSkuService;
