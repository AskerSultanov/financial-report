import { reportModel } from "../../../models/index.js";

var getReportsByUserId = async (userId, session, selectedFields = null, reportIds) => {
  var sessionOptions = session ? { session } : {};

  if (reportIds) {
    var data = await reportModel.find({ userId, reportId: { $in: reportIds } }, {});
    return { reports: data };
  }

  if (selectedFields) {
    var { reports } = await reportModel.find({ userId }, null, { ...sessionOptions }).select(selectedFields);

    return { reports };
  }

  var reports = await reportModel.find({ userId }, null, { ...sessionOptions });
  return { reports };
};
export default getReportsByUserId;
