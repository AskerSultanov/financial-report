import { reportsWithAccountedFinancesModel } from "../../../models/index.js";

var mskTimeOffsetInMs = 10_800_000;

var addReportToAccounted = async (userId, reportId, dateFrom, dateTo) => {
  return await reportsWithAccountedFinancesModel.create({
    userId,
    reportId,
    dateFrom,
    dateTo,
    financesAccountedAt: Date.now() + mskTimeOffsetInMs,
  });
};

export default addReportToAccounted;
