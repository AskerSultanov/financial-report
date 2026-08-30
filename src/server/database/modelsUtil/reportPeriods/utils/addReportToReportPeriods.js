import { reportPeriodModel } from "../../../models/index.js";

var addReportToReportPeriods = async (userId, report, session) => {
  var sessionOption = session ? { session } : {};

  return await reportPeriodModel.updateOne({ userId }, { $push: { reportPeriods: { ...report } } }, { ...sessionOption });
};

export default addReportToReportPeriods;
