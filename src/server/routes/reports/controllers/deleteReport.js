import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import recalculateTaxParamsAfterReportDeletion from "../services/different/recalculateTaxParamsAfterReportDeletion.js";

var { deleteReportFromDb } = dbUtils.reportModelUtils;
var { removeReportFromReportPeriods } = dbUtils.reportPeriodsModelUtils;
var { getTaxParamsFromDb, updateTaxParamsToDb } = dbUtils.taxParamsModelUtils;
var { removeReportFromAccounted } =
  dbUtils.reportsWithAccountedFinancesModelUtils;

var deleteReportController = async (req, res, next) => {
  var { userId, reportId } = req.body;

  var session = await dbClient.startSession();
  try {
    await session.withTransaction(async () => {
      var taxParams = await getTaxParamsFromDb(userId, null, session);

      var { reportBeforeDeletion } = await deleteReportFromDb(
        userId,
        reportId,
        session,
      );

      var { dateFrom, dateTo, skus } = reportBeforeDeletion;

      var startYear = +dateFrom.split("-")[0];
      var endYear = +dateTo.split("-")[0];

      var updatedTaxParams = [];

      for (var year = startYear; year <= endYear; year++) {
        var taxParamsOfYear = taxParams.find((item) => item.year === year);

        var { recalculatedTaxParams } = recalculateTaxParamsAfterReportDeletion(
          taxParamsOfYear,
          skus,
        );

        updatedTaxParams.push({ year, data: recalculatedTaxParams });
      }

      await removeReportFromAccounted(userId, reportId, session);
      await removeReportFromReportPeriods(userId, dateFrom, dateTo, session);

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

export default deleteReportController;
