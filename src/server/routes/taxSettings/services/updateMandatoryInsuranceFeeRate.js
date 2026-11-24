import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import recalculateReportsWithNewMandatoryInsuranceRate from "./utils/recalculateReportsWithNewMandatoryInsuranceRate.js";

var { updateSkus } = dbUtils.skuModelUtils;
var { getReports } = dbUtils.basicReportsDataModelUtils;
var { getTaxSettingByYear, updateTaxSettings } = dbUtils.taxSettingModelUtils;

var updateMandatoryInsuranceFeeRateService = async (
  userId,
  year,
  newMandatoryInsuranceFeeRate,
  reportsNeedRecalculation,
) => {
  var session = await dbClient.startSession();

  return await session.withTransaction(async () => {
    var taxSetting = await getTaxSettingByYear(userId, year, session);

    if (taxSetting.mandatoryInsuranceFeeRate === newMandatoryInsuranceFeeRate) {
      return { mandatoryInsuranceFeeRateIsEqual: true };
    }

    // var { reports } = await getReports(userId, session);

    var updatedTaxSettings = [];

    // if (!reportsNeedRecalculation) {
    updatedTaxSettings.push({
      year,
      data: { mandatoryInsuranceFeeRate: newMandatoryInsuranceFeeRate },
    });

    await updateTaxSettings(userId, updatedTaxSettings, session);
    return { mandatoryInsuranceFeeRateIsEqual: false };
    // }

    // if (reports.length) {
    //   var { mandatoryInsuranceFee } = taxSetting;
    //   var {
    //     updatedSkus,
    //     finalProfit,
    //     paidInsuranceFee,
    //     mandatoryInsuranceFeeIsPaid,
    //   } = recalculateReportsWithNewMandatoryInsuranceRate(
    //     year,
    //     reports,
    //     mandatoryInsuranceFee,
    //     newMandatoryInsuranceFeeRate,
    //   );

    //   await updateSkus(userId, updatedSkus, session);

    //   updatedTaxSettings.push({
    //     year,
    //     data: {
    //       finalProfit,
    //       paidInsuranceFee,
    //       mandatoryInsuranceFeeIsPaid,
    //       mandatoryInsuranceFeeRate: newMandatoryInsuranceFeeRate,
    //     },
    //   });

    //   await updateTaxSettings(userId, updatedTaxSettings, session);
    //   return { mandatoryInsuranceFeeRateIsEqual: false };
    // } else {
    //   updatedTaxSettings.push({
    //     year,
    //     data: { mandatoryInsuranceFeeRate: newMandatoryInsuranceFeeRate },
    //   });

    //   await updateTaxSettings(userId, updatedTaxSettings, session);
    //   return { mandatoryInsuranceFeeRateIsEqual: false };
    // }
  });
};

export default updateMandatoryInsuranceFeeRateService;
