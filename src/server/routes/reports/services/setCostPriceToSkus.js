import calc from "./utils/calcUtils/index.js";
import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import getPrevSkuData from "./utils/different/getPrevSkuData.js";
import recalculateTaxParams from "./utils/different/recalculateTaxParams.js";
import verifyAllSkusExistInReport from "./utils/different/verifyAllSkusExistInReport.js";

var { updateSkusInListGoods } = dbUtils.goodsModelUtils;
var { getSkusFromReport, updateSkus } = dbUtils.skuModelUtils;
var { getTaxParamsFromDb, updateTaxParamsToDb } = dbUtils.taxParamsModelUtils;

var setCostPriceToSkusService = async (data, res, next) => {
  var { userId, reportId, year, dateFrom, dateTo, costPrices } = data;

  var session = await dbClient.startSession();

  return await session.withTransaction(async () => {
    var skuNames = costPrices.map(({ skuName }) => skuName);

    var { skusFromReport } = await getSkusFromReport(
      userId,
      reportId,
      skuNames,
      session,
    );

    if (!skusFromReport.length) {
      return {
        updatedSkus: [],
        reportNotFound: true,
        dataIsInvalid: false,
        updatedSkusData: {},
      };
    }

    var { allSkusExist } = verifyAllSkusExistInReport(skusFromReport, skuNames);

    if (!allSkusExist) {
      return {
        updatedSkus: [],
        dataIsInvalid: true,
        reportNotFound: false,
        updatedSkusData: {},
      };
    }

    var taxParams = await getTaxParamsFromDb(userId, year, session);

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

      var { updatedSkuFields, updatedTaxParamsFieldsBySku } =
        calc.sku.restParams(sku, prevSkuData, taxParams);

      var { updatedTaxParamsField } = recalculateTaxParams(
        updatedTaxParamsFieldsBySku,
        prevSkuData,
        updatedSkuFields,
      );

      taxParams = Object.assign(taxParams, updatedTaxParamsField);

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
        updatedSkusData: {},
      };
    }

    var updatedTaxParams = [{ year, data: taxParams }];

    await updateSkus(userId, updatedSkus, session);
    await updateTaxParamsToDb(userId, updatedTaxParams, session);
    await updateSkusInListGoods(userId, updatedSkusToListGoods, session);

    return {
      dataIsInvalid: false,
      reportNotFound: false,
      updatedSkus: updatedSkusToClient,
      updatedSkusData: {
        // years: [startYear, endYear],
        updatedSkus: updatedSkusToClient,
      },
    };
  });
};

export default setCostPriceToSkusService;
