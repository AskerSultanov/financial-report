import { reportPeriodModel } from "../../../models/index.js";

var getReportPeriods = async (userId, session) => {
  var sessionOption = session ? { session } : {};

  var { reportPeriods } = await reportPeriodModel.findOne({ userId }, {}, { ...sessionOption });

  return { reportPeriods };
};

export default getReportPeriods;
