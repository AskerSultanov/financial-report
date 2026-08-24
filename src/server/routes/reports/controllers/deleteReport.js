import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import recalculateTaxParamsAfterReportDeletion from "../services/different/recalculateTaxParamsAfterReportDeletion.js";

var { deleteReportFromDb } = dbUtils.reportModelUtils;
var { deleteReportFromReportTree } = dbUtils.reportsTreeModelUtils;
var { getTaxParamsFromDb, changeTaxParamsToDb } = dbUtils.taxParamsModelUtils;
var { removeReportFromAccounted } = dbUtils.reportsWithAccountedFinancesModelUtils;

var deleteReport = async (req, res, next) => {
  var { userId, reportId, skuNames } = req.body;

  var session = await dbClient.startSession();
  try {
    await session.withTransaction(async () => {
      var taxParams = await getTaxParamsFromDb(userId, null, session);

      var { reportBeforeDeletion } = await deleteReportFromDb(userId, reportId, session);
      var { dateFrom, dateTo, skus, isCrossYearPeriod, recordedTo } = reportBeforeDeletion;
      var { year, month } = recordedTo;
      var startYear = +dateFrom.split("-")[0];
      var endYear = +dateTo.split("-")[0];

      if (isCrossYearPeriod) {
        var startYearTaxParams = taxParams.find((params) => params.year === startYear);
        var endYearTaxParams = taxParams.find((params) => params.year === endYear);

        startYearTaxParams = recalculateTaxParamsAfterReportDeletion(startYearTaxParams, skus).updatedTaxParams;

        endYearTaxParams = recalculateTaxParamsAfterReportDeletion(endYearTaxParams, skus).updatedTaxParams;

        await changeTaxParamsToDb(userId, session, startYearTaxParams, endYearTaxParams);
      } else {
        var taxParamsOfYear = taxParams.find((params) => params.year === year);

        var { updatedTaxParams } = recalculateTaxParamsAfterReportDeletion(taxParamsOfYear, skus);
        await changeTaxParamsToDb(userId, session, updatedTaxParams);
      }

      await removeReportFromAccounted(userId, reportId);
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
