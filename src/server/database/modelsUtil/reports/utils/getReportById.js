import { reportModel } from "../../../models/index.js";

var getReportById = async (userId, reportId, session) => {
  var sessionOpt = session ? { session: session } : {};
  var report = await reportModel.findOne({ userId, reportId }, null, { ...sessionOpt });

  return { report };
};

export default getReportById;
