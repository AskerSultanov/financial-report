import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/collections/index.js";
import getTaxParamKeyName from "../services/getTaxParamKeyName.js";
import defaultTaxParams from "../../../database/defaultTaxParams.js";
import recalculateReportsWithNewTaxRate from "../services/recalculateReportsWithNewTaxRate.js";
import recalculateReportsWithNewMandatoryInsuranceRate from "../services/recalculateReportsWithNewMandatoryInsuranceRate.js";

var { getTaxParamsFromDb, changeTaxParamsToDb } = dbUtils.taxParamsCollectionServices;
var { getReportsByUserId, saveUpdatedReports, saveUpdatedReport } = dbUtils.reportCollectionServices;

var changeTaxParams = async (req, res, next) => {
  var { userId, year, reportsNeedRecalculation, data } = req.body;

  var { taxParamKeyName } = getTaxParamKeyName(data);

  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      var taxParams = await getTaxParamsFromDb(userId, year, session);

      var { reports } = await getReportsByUserId(userId, session);

      if (taxParams[taxParamKeyName] === data[taxParamKeyName]) {
        return res.sendStatus(409);
      }

      if (!reportsNeedRecalculation) {
        await changeTaxParamsToDb(userId, session, { year, [taxParamKeyName]: data[taxParamKeyName] });
        return res.sendStatus(200);
      }

      switch (taxParamKeyName) {
        case "taxRate":
          var newTaxRate = data[taxParamKeyName];

          if (reports.length) {
            var resetPaidTaxAmount = -taxParams.mandatoryInsuranceFee;

            var { updatedReports, finalProfit, paidTaxAmount } = recalculateReportsWithNewTaxRate(reports, resetPaidTaxAmount, newTaxRate, year);

            await saveUpdatedReports(userId, updatedReports, session);
            await changeTaxParamsToDb(userId, session, { year, finalProfit, paidTaxAmount, taxRate: newTaxRate });
          } else {
            await changeTaxParamsToDb(userId, session, { year, taxRate: newTaxRate });
          }

          break;

        case "mandatoryInsuranceFeeRate":
          var newMandatoryInsuranceFeeRate = data[taxParamKeyName];

          if (reports.length) {
            var { mandatoryInsuranceFee } = oldTaxParams;
            var { updatedReports, finalProfit, paidInsuranceFee, mandatoryInsuranceFeeIsPaid } = recalculateReportsWithNewMandatoryInsuranceRate(
              year,
              reports,
              mandatoryInsuranceFee,
              newMandatoryInsuranceFeeRate,
            );

            await saveUpdatedReports(userId, updatedReports, session);

            await changeTaxParamsToDb(userId, session, {
              year,
              paidInsuranceFee,
              mandatoryInsuranceFeeIsPaid,
              mandatoryInsuranceFeeRate: newMandatoryInsuranceFeeRate,
            });
          } else {
            await changeTaxParamsToDb(userId, session, { year, mandatoryInsuranceFeeRate: newMandatoryInsuranceFeeRate });
          }

          break;
        case "mandatoryInsuranceFee":
          var newMandatoryInsuranceFee = data[taxParamKeyName];

          break;
      }
    });

    res.sendStatus(200);
  } catch (e) {
    console.log({ e });
    res.sendStatus(304);
  } finally {
    if (session && session.inTransaction()) {
      await session.endSession();
    }
  }
};

export default changeTaxParams;
