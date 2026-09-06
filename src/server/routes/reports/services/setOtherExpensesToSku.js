import calc from "./utils/calcServices/index.js";
import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import getPrevSkuData from "./utils/different/getPrevSkuData.js";
import excludeEqualParams from "./utils/different/excludeEqualParams.js";
import recalculateTaxParams from "./utils/different/recalculateTaxParams.js";

var { saveUpdatedReport, getSkuFromReport } = dbUtils.reportModelUtils;
var { getTaxParamsFromDb, updateTaxParamsToDb } = dbUtils.taxParamsModelUtils;

var setOtherExpensesToSkuService = async (data) => {
  var { userId, reportId, skuName, year, otherExpenses } = data;

  var session = await dbClient.startSession();

  return await session.withTransaction(async () => {
    var { report } = await getSkuFromReport(userId, reportId, skuName, session);

    if (!report) {
      return {
        reportNotFound: true,
        updatedSkuData: {},
        otherExpensesIsEqual: false,
      };
    }

    var sku;

    if (report.skus.length > 1) {
      sku = report.skus.find((sku) => sku.year === year);
    } else {
      sku = report.skus[0];
    }

    if (sku.otherExpenses === otherExpenses) {
      return {
        otherExpensesIsEqual: true,
        reportNotFound: false,
        updatedSkuData: {},
      };
    }

    var prevSkuData = getPrevSkuData(sku);
    var taxParams = await getTaxParamsFromDb(userId, year, session);

    sku.otherExpenses = otherExpenses;

    var { updatedSkuFields, updatedTaxParamsFieldsBySku } = calc.sku.restParams(
      sku,
      prevSkuData,
      taxParams,
    );
    var updatedSkus = [{ skuName, data: updatedSkuFields }];

    var { updatedTaxParamsField } = recalculateTaxParams(
      updatedTaxParamsFieldsBySku,
      prevSkuData,
      updatedSkuFields,
    );

    var updatedTaxParams = [{ year, data: updatedTaxParamsField }];

    await updateTaxParamsToDb(userId, updatedTaxParams, session);
    await saveUpdatedReport(userId, reportId, updatedSkus, session);

    var years = [];
    var skuDataToClient = excludeEqualParams(prevSkuData, updatedSkuFields);

    if (report.isCrossYearPeriod) {
      var startYear = +report.dateFrom.split("-")[0];
      var endYear = +report.dateTo.split("-")[0];
      var requiredYear = year === startYear ? startYear : endYear;
      years = [requiredYear];
    }

    return {
      otherExpensesIsEqual: false,
      reportNotFound: false,
      updatedSkuData: {
        years,
        sku: { year, skuName, data: skuDataToClient },
        isCrossYearPeriod: report.isCrossYearPeriod,
      },
    };
  });
};

export default setOtherExpensesToSkuService;
