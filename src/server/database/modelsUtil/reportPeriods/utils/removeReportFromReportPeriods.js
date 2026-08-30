import { reportPeriodModel } from "../../../models/index.js";

var removeReportFromReportPeriods = async (userId, dateFrom, dateTo, session) => {
  var sessionOption = session ? { session } : {};

  return await reportPeriodModel.updateOne({ userId }, { $pull: { reportPeriods: { dateFrom, dateTo } } }, { ...sessionOption });
};

export default removeReportFromReportPeriods;
