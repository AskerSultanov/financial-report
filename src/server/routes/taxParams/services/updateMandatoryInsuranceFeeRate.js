import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import recalculateReportsWithNewMandatoryInsuranceRate from "./utils/recalculateReportsWithNewMandatoryInsuranceRate.js";

var { getReportsByUserId, saveUpdatedReports } = dbUtils.reportModelUtils;
var { getTaxParamsFromDb, updateTaxParamsToDb } = dbUtils.taxParamsModelUtils;

var updateMandatoryInsuranceFeeRateService = async (
  userId,
  year,
  newMandatoryInsuranceFeeRate,
  reportsNeedRecalculation,
) => {
  var session = await dbClient.startSession();

  return await session.withTransaction(async () => {
    var taxParams = await getTaxParamsFromDb(userId, year, session);

    if (taxParams.mandatoryInsuranceFeeRate === newMandatoryInsuranceFeeRate) {
      return { mandatoryInsuranceFeeRateIsEqual: true };
    }

    var { reports } = await getReportsByUserId(userId, session);

    var updatedTaxParams = [];

    if (!reportsNeedRecalculation) {
      updatedTaxParams.push({
        year,
        data: { mandatoryInsuranceFeeRate: newMandatoryInsuranceFeeRate },
      });

      await updateTaxParamsToDb(userId, updatedTaxParams, session);
      return { mandatoryInsuranceFeeRateIsEqual: false };
    }

    if (reports.length) {
      var { mandatoryInsuranceFee } = taxParams;
      var {
        updatedReports,
        finalProfit,
        paidInsuranceFee,
        mandatoryInsuranceFeeIsPaid,
      } = recalculateReportsWithNewMandatoryInsuranceRate(
        year,
        reports,
        mandatoryInsuranceFee,
        newMandatoryInsuranceFeeRate,
      );

      await saveUpdatedReports(userId, updatedReports, session);

      updatedTaxParams.push({
        year,
        data: {
          finalProfit,
          paidInsuranceFee,
          mandatoryInsuranceFeeIsPaid,
          mandatoryInsuranceFeeRate: newMandatoryInsuranceFeeRate,
        },
      });

      await updateTaxParamsToDb(userId, updatedTaxParams, session);
      return { mandatoryInsuranceFeeRateIsEqual: false };
    } else {
      updatedTaxParams.push({
        year,
        data: { mandatoryInsuranceFeeRate: newMandatoryInsuranceFeeRate },
      });

      await updateTaxParamsToDb(userId, updatedTaxParams, session);
      return { mandatoryInsuranceFeeRateIsEqual: false };
    }
  });
};

export default updateMandatoryInsuranceFeeRateService;
