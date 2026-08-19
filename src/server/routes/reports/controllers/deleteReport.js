import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/collections/index.js";
import recalculateTaxParamsAfterReportDeletion from "../services/different/recalculateTaxParamsAfterReportDeletion.js";

var currentYearPropPostfix = "InCurrentYear";
var nextYearPropPostfix = "InNextYear";

var { deleteReportFromDb } = dbUtils.reportCollectionServices;
var { deleteReportFromReportTree } = dbUtils.reportsTreeCollectionServices;
var { getTaxParamsFromDb, changeTaxParamsToDb } = dbUtils.taxParamsCollectionServices;

var deleteReport = async (req, res, next) => {
  var { userId, reportId, skuNames } = req.body;

  var session = await dbClient.startSession();
  try {
    await session.withTransaction(async () => {
      var taxParams = await getTaxParamsFromDb(userId, null, session);

      var { reportBeforeDeletion } = await deleteReportFromDb(userId, reportId, session);
      var { year, month } = reportBeforeDeletion.recordedTo;
      var startYear = +reportBeforeDeletion.dateFrom.split("-")[0];
      var endYear = +reportBeforeDeletion.dateTo.split("-")[0];

      if (reportBeforeDeletion.isCrossYearPeriod) {
        var startYearTaxParams = taxParams.find((params) => params.year === startYear);
        var endYearTaxParams = taxParams.find((params) => params.year === endYear);

        startYearTaxParams = recalculateTaxParamsAfterReportDeletion(
          startYearTaxParams,
          reportBeforeDeletion,
          currentYearPropPostfix,
        ).updatedTaxParams;

        endYearTaxParams = recalculateTaxParamsAfterReportDeletion(endYearTaxParams, reportBeforeDeletion, nextYearPropPostfix).updatedTaxParams;

        await changeTaxParamsToDb(userId, session, startYearTaxParams, endYearTaxParams);
      } else {
        var taxParamsOfYear = taxParams.find((params) => params.year === year);

        var { updatedTaxParams } = recalculateTaxParamsAfterReportDeletion(taxParamsOfYear, reportBeforeDeletion);
        await changeTaxParamsToDb(userId, session, updatedTaxParams);
      }

      await deleteReportFromReportTree(userId, year, month, reportId, session);
    });

    return res.sendStatus(200);
  } catch (e) {
    console.log({ e });
    res.sendStatus(304);
  } finally {
    await session.endSession();
  }
};

export default deleteReport;
