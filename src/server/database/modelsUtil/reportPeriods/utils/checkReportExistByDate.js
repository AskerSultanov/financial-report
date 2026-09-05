import { reportPeriodModel } from "../../../models/index.js";

var checkReportExistByDate = async (userId, dateFrom, session) => {
  var sessionOption = session ? { session } : {};

  var data = await reportPeriodModel.findOne(
    { userId, "reportPeriods.dateFrom": dateFrom },
    { _id: 0, reportPeriods: 1 },
    { ...sessionOption },
  );

  return data;
};

export default checkReportExistByDate;
