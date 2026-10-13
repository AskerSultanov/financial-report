import calc from "./utils/calcUtils/index.js";
import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import getPrevSkuData from "./utils/different/getPrevSkuData.js";
import recalculateTaxParams from "./utils/different/recalculateTaxParams.js";
import verifyAllSkusExistInReport from "./utils/different/verifyAllSkusExistInReport.js";

var { updateSkusInListGoods } = dbUtils.goodsModelUtils;
var { saveUpdatedReport, getSkusFromReport } = dbUtils.reportModelUtils;
var { getTaxParamsFromDb, updateTaxParamsToDb } = dbUtils.taxParamsModelUtils;

var setCostPriceToSkusService = async (data, res, next) => {
  var { userId, reportId, year, costPrices } = data;

  var session = await dbClient.startSession();

  return await session.withTransaction(async () => {
    var skuNames = costPrices.map(({ skuName }) => skuName);

    var { report } = await getSkusFromReport(
      userId,
      reportId,
      skuNames,
      session,
    );

    if (!report) {
      return {
        reportNotFound: true,
        dataIsInvalid: false,
        updatedSkusData: {},
      };
    }

    var { allSkusExist } = verifyAllSkusExistInReport(report.skus, skuNames);

    if (!allSkusExist) {
      return {
        dataIsInvalid: true,
        reportNotFound: false,
        updatedSkusData: {},
      };
    }

    var taxParams = await getTaxParamsFromDb(userId, year, session);

    var { skus } = report;

    var updatedSkus = [];
    var skusDataToClient = [];
    var updatedSkusToListGoods = [];

    for (var { skuName, lastCostPrice } of costPrices) {
      var skuIndex = skus.findIndex((sku) => sku.skuName === skuName);

      var sku = skus[skuIndex];

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

      updatedSkus.push({ skuName, data: updatedSkuFields });
      updatedSkusToListGoods.push({
        skuName,
        year: sku.year,
        data: { lastCostPrice },
      });

      skusDataToClient.push({
        skuName,
        year: year,
        data: { ...updatedSkuFields },
      });
    }

    if (!skusDataToClient.length) {
      return {
        dataIsInvalid: true,
        reportNotFound: false,
        updatedSkusData: {},
      };
    }

    var requiredYear = year;
    var startYear = +report.dateFrom.split("-")[0];
    var endYear = +report.dateTo.split("-")[0];

    var updatedTaxParams = [{ year, data: taxParams }];

    await updateTaxParamsToDb(userId, updatedTaxParams, session);
    await saveUpdatedReport(userId, reportId, updatedSkus, session);
    await updateSkusInListGoods(userId, updatedSkusToListGoods, session);

    return {
      dataIsInvalid: false,
      reportNotFound: false,
      updatedSkusData: {
        requiredYear,
        skusDataToClient,
        years: [startYear, endYear],
        isCrossYearPeriod: report.isCrossYearPeriod,
      },
    };
  });
};

export default setCostPriceToSkusService;
