import { basicReportDataModel } from "../../../models/index.js";

var getReport = async (userId, reportId, session) => {
  var sessionOptions = session
    ? { session }
    : { readPreference: "secondaryPreferred" };

  var report = await basicReportDataModel
    .findOne({ userId, reportId }, null, {
      ...sessionOptions,
    })
    .populate("skus");

  return { report };
};

export default getReport;
