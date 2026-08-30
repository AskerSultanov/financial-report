import { reportPeriodModel } from "../../../models/index.js";

var checkReportExistByDate = async (userId, dateFrom, session) => {
  var sessionOption = session ? { session } : {};

  var report = await reportPeriodModel.findOne({ userId, "reportPeriods.dateFrom": dateFrom }, {}, { ...sessionOption });

  return report;
};

export default checkReportExistByDate;
