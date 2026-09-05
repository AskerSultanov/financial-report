import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import recalculateReportsWithNewTaxRate from "./utils/recalculateReportsWithNewTaxRate.js";

var { getReportsByUserId, saveUpdatedReports } = dbUtils.reportModelUtils;
var { getTaxParamsFromDb, updateTaxParamsToDb } = dbUtils.taxParamsModelUtils;

var updateTaxRateService = async (
  userId,
  year,
  newTaxRate,
  reportsNeedRecalculation,
) => {
  var session = await dbClient.startSession();

  return await session.withTransaction(async () => {
    var taxParams = await getTaxParamsFromDb(userId, year, session);

    if (taxParams.taxRate === newTaxRate) {
      return { taxRateIsEqual: true };
    }

    var { reports } = await getReportsByUserId(userId, session);

    var updatedTaxParams = [];

    if (!reportsNeedRecalculation) {
      updatedTaxParams.push({ year, data: { taxRate: newTaxRate } });

      await updateTaxParamsToDb(userId, updatedTaxParams, session);
      return { taxRateIsEqual: false };
    }

    if (reports.length) {
      var resetPaidTaxAmount = -taxParams.mandatoryInsuranceFee;

      var { updatedReports, finalProfit, paidTaxAmount } =
        recalculateReportsWithNewTaxRate(
          reports,
          resetPaidTaxAmount,
          newTaxRate,
          year,
        );

      await saveUpdatedReports(userId, updatedReports, session);

      updatedTaxParams.push({
        year,
        data: { finalProfit, paidTaxAmount, taxRate: newTaxRate },
      });

      await updateTaxParamsToDb(userId, updatedTaxParams, session);
      return { taxRateIsEqual: false };
    } else {
      updatedTaxParams.push({ year, data: { taxRate: newTaxRate } });

      await updateTaxParamsToDb(userId, updatedTaxParams, session);
      return { taxRateIsEqual: false };
    }
  });
};

export default updateTaxRateService;
