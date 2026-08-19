import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/collections/index.js";
import getTaxParamKeyName from "../services/getTaxParamKeyName.js";
import defaultTaxParams from "../../../database/defaultTaxParams.js";
import recalculateReportsWithNewTaxRate from "../services/recalculateReportsWithNewTaxRate.js";
import recalculateReportsWithNewMandatoryInsuranceRate from "../services/recalculateReportsWithNewMandatoryInsuranceRate.js";

var { changeTaxParamsToDb } = dbUtils.taxParamsCollectionServices;
var { getReportsByUserId, saveUpdatedReports } = dbUtils.reportCollectionServices;

var changeTaxParams = async (req, res, next) => {
  var { userId, year, oldTaxParams, reportsNeedRecalculation, data } = req.body;

  var { taxParamKeyName } = getTaxParamKeyName(data);

  if (!reportsNeedRecalculation) {
    try {
      await changeTaxParamsToDb(userId, null, { year, [taxParamKeyName]: data[taxParamKeyName] });
      res.sendStatus(200);
    } catch (e) {
      res.sendStatus(304);
    }

    return;
  }

  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      var { reports } = await getReportsByUserId(userId, session);

      var requiredReports = reports.filter((report) => {
        if (report.isCrossYearPeriod) {
          var startYear = +report.dateFrom.split("-")[0];
          var endYear = +report.dateTo.split("-")[0];
          if (startYear === year || endYear === year) {
            return report;
          }
        } else {
          if (report.recordedTo.year === year) {
            return report;
          }
        }
      });

      switch (taxParamKeyName) {
        case "taxRate":
          var newTaxRate = data[taxParamKeyName];

          if (requiredReports.length) {
            var resetPaidTaxAmount = -oldTaxParams.mandatoryInsuranceFee;

            var { updatedReports, finalProfit, paidTaxAmount } = recalculateReportsWithNewTaxRate(
              requiredReports,
              resetPaidTaxAmount,
              newTaxRate,
              year,
            );

            await saveUpdatedReports(userId, updatedReports, session);
            await changeTaxParamsToDb(userId, session, { year, finalProfit, paidTaxAmount, taxRate: newTaxRate });
          } else {
            await changeTaxParamsToDb(userId, session, { year, taxRate: newTaxRate });
          }

          break;
        case "mandatoryInsuranceFeeRate":
          var newMandatoryInsuranceFeeRate = data[taxParamKeyName];

          if (requiredReports.length) {
            var { mandatoryInsuranceFee } = oldTaxParams;
            var { updatedReports, finalProfit, paidInsuranceFee, mandatoryInsuranceFeeIsPaid } = recalculateReportsWithNewMandatoryInsuranceRate(
              year,
              requiredReports,
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
