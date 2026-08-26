import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import recalculateTaxParamsAfterReportDeletion from "../services/different/recalculateTaxParamsAfterReportDeletion.js";

var { deleteReportFromDb } = dbUtils.reportModelUtils;
var { deleteReportFromReportTree } = dbUtils.reportsTreeModelUtils;
var { getTaxParamsFromDb, updateTaxParamsToDb } = dbUtils.taxParamsModelUtils;
var { removeReportFromAccounted } = dbUtils.reportsWithAccountedFinancesModelUtils;

var deleteReport = async (req, res, next) => {
  var { userId, reportId } = req.body;

  var session = await dbClient.startSession();
  try {
    await session.withTransaction(async () => {
      var taxParams = await getTaxParamsFromDb(userId, null, session);

      var { reportBeforeDeletion } = await deleteReportFromDb(userId, reportId, session);
      var { dateFrom, dateTo, skus, isCrossYearPeriod, recordedTo } = reportBeforeDeletion;
      var { year, month } = recordedTo;
      var startYear = +dateFrom.split("-")[0];
      var endYear = +dateTo.split("-")[0];

      var updatedTaxParams = [];

      if (isCrossYearPeriod) {
        var startYearTaxParams = taxParams.find((params) => params.year === startYear);
        var endYearTaxParams = taxParams.find((params) => params.year === endYear);

        startYearTaxParams = recalculateTaxParamsAfterReportDeletion(startYearTaxParams, skus).recalculatedTaxParams;

        endYearTaxParams = recalculateTaxParamsAfterReportDeletion(endYearTaxParams, skus).recalculatedTaxParams;

        updatedTaxParams.push({ year: startYear, data: startYearTaxParams });
        updatedTaxParams.push({ year: endYear, data: endYearTaxParams });
      } else {
        var taxParamsOfYear = taxParams.find((params) => params.year === year);

        var { recalculatedTaxParams } = recalculateTaxParamsAfterReportDeletion(taxParamsOfYear, skus);

        updatedTaxParams.push({ year, data: recalculatedTaxParams });
      }

      await removeReportFromAccounted(userId, reportId);
      await deleteReportFromReportTree(userId, year, month, reportId, session);

      await updateTaxParamsToDb(userId, updatedTaxParams, session);
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
