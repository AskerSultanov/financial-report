import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import recalculateTaxParamsAfterReportDeletion from "./utils/different/recalculateTaxParamsAfterReportDeletion.js";

var { deleteReportFromDb } = dbUtils.reportModelUtils;
var { removeReportFromReportPeriods } = dbUtils.reportPeriodsModelUtils;
var { getTaxParamsFromDb, updateTaxParamsToDb } = dbUtils.taxParamsModelUtils;
var { removeReportFromAccounted } =
  dbUtils.reportsWithAccountedFinancesModelUtils;

var deleteReportService = async (data) => {
  var { userId, reportId } = data;

  var session = await dbClient.startSession();

  return await session.withTransaction(async () => {
    var taxParams = await getTaxParamsFromDb(userId, null, session);

    var { reportBeforeDeletion } = await deleteReportFromDb(
      userId,
      reportId,
      session,
    );

    if (!reportBeforeDeletion) {
      return { reportNotFound: true, reportDeleted: false };
    }

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

    return { reportNotFound: false, reportDeleted: true };
  });
};

export default deleteReportService;
