import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import recalculateTaxSettingAfterReportDeletion from "./utils/different/recalculateTaxSettingAfterReportDeletion.js";

var { deleteReport } = dbUtils.basicReportsDataModelUtils;
var { getTaxSettingsByYears, updateTaxSettings } = dbUtils.taxSettingModelUtils;

var deleteReportService = async (data) => {
  var { userId, reportId } = data;

  var session = await dbClient.startSession();

  return await session.withTransaction(async () => {
    var { taxSettings } = await getTaxSettingsByYears(userId, session);

    var { reportBeforeDeletion } = await deleteReport(
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

    var updatedTaxSettings = [];

    for (var year = startYear; year <= endYear; year++) {
      var taxSetting = taxSettings.find((item) => item.year === year);

      var { recalculatedTaxSetting } = recalculateTaxSettingAfterReportDeletion(
        taxSetting,
        skus,
      );

      updatedTaxSettings.push({ year, data: recalculatedTaxSetting });
    }

    await updateTaxSettings(userId, updatedTaxSettings, session);

    return { reportNotFound: false, reportDeleted: true };
  });
};

export default deleteReportService;
