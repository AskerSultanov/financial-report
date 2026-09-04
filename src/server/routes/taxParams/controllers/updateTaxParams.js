import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import getTaxParamKeyName from "../services/getTaxParamKeyName.js";
import recalculateReportsWithNewTaxRate from "../services/recalculateReportsWithNewTaxRate.js";
import recalculateReportsWithNewMandatoryInsuranceRate from "../services/recalculateReportsWithNewMandatoryInsuranceRate.js";

var { getReportsByUserId, saveUpdatedReports } = dbUtils.reportModelUtils;
var { getTaxParamsFromDb, updateTaxParamsToDb } = dbUtils.taxParamsModelUtils;

var updateTaxParamsController = async (req, res, next) => {
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

      var updatedTaxParams = [];

      if (!reportsNeedRecalculation) {
        updatedTaxParams.push({ year, data: { [taxParamKeyName]: data[taxParamKeyName] } });

        await updateTaxParamsToDb(userId, updatedTaxParams, session);
        return res.sendStatus(200);
      }

      switch (taxParamKeyName) {
        case "taxRate":
          var newTaxRate = data[taxParamKeyName];

          if (reports.length) {
            var resetPaidTaxAmount = -taxParams.mandatoryInsuranceFee;

            var { updatedReports, finalProfit, paidTaxAmount } = recalculateReportsWithNewTaxRate(reports, resetPaidTaxAmount, newTaxRate, year);

            await saveUpdatedReports(userId, updatedReports, session);

            updatedTaxParams.push({ year, data: { finalProfit, paidTaxAmount, taxRate: newTaxRate } });

            await updateTaxParamsToDb(userId, updatedTaxParams, session);
          } else {
            updatedTaxParams.push({ year, data: { taxRate: newTaxRate } });

            await updateTaxParamsToDb(userId, updatedTaxParams, session);
          }

          break;

        case "mandatoryInsuranceFeeRate":
          var newMandatoryInsuranceFeeRate = data[taxParamKeyName];

          if (reports.length) {
            var { mandatoryInsuranceFee } = taxParams;
            var { updatedReports, finalProfit, paidInsuranceFee, mandatoryInsuranceFeeIsPaid } = recalculateReportsWithNewMandatoryInsuranceRate(
              year,
              reports,
              mandatoryInsuranceFee,
              newMandatoryInsuranceFeeRate,
            );

            await saveUpdatedReports(userId, updatedReports, session);

            updatedTaxParams.push({
              year,
              data: {
                paidInsuranceFee,
                mandatoryInsuranceFeeIsPaid,
                mandatoryInsuranceFeeRate: newMandatoryInsuranceFeeRate,
              },
            });

            await updateTaxParamsToDb(userId, updatedTaxParams, session);
          } else {
            updatedTaxParams.push({ year, data: { mandatoryInsuranceFeeRate: newMandatoryInsuranceFeeRate } });

            await updateTaxParamsToDb(userId, updatedTaxParams, session);
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

export default updateTaxParamsController;
