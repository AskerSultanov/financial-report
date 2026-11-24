import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import recalculateReportsWithNewTaxRate from "./utils/recalculateReportsWithNewTaxRate.js";

var { updateSkus } = dbUtils.skuModelUtils;
var { getReports } = dbUtils.basicReportsDataModelUtils;
var { getTaxSettingByYear, updateTaxSettings } = dbUtils.taxSettingModelUtils;

var updateTaxRateService = async (
  userId,
  year,
  newTaxRate,
  reportsNeedRecalculation,
) => {
  var session = await dbClient.startSession();

  return await session.withTransaction(async () => {
    var { taxSetting } = await getTaxSettingByYear(userId, year, session);

    if (taxSetting.taxRate === newTaxRate) {
      return { taxRateIsEqual: true };
    }

    //var { reports } = await getReports(userId, session);

    var updatedTaxSettings = [];

    // if (!reportsNeedRecalculation) {
    updatedTaxSettings.push({ year, data: { taxRate: newTaxRate } });

    await updateTaxSettings(userId, updatedTaxSettings, session);
    return { taxRateIsEqual: false };
    //  }

    //if (reports.length) {
    // var resetPaidTaxAmount = -taxSetting.mandatoryInsuranceFee;

    // var { updatedSkus, finalProfit, paidTaxAmount } =
    //   recalculateReportsWithNewTaxRate(
    //     reports,
    //     resetPaidTaxAmount,
    //     newTaxRate,
    //     year,
    //   );

    // await updateSkus(userId, updatedSkus, session);

    // updatedTaxSettings.push({
    //   year,
    //   data: { finalProfit, paidTaxAmount, taxRate: newTaxRate },
    // });

    // await updateTaxSettings(userId, updatedTaxSettings, session);
    // return { taxRateIsEqual: false };
    // } else {
    // updatedTaxSettings.push({ year, data: { taxRate: newTaxRate } });

    // await updateTaxSettings(userId, updatedTaxSettings, session);
    // return { taxRateIsEqual: false };
    //  }
  });
};

export default updateTaxRateService;
