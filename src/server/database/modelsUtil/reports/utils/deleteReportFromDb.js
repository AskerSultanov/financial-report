import { reportModel } from "../../../models/index.js";

var deleteReportFromDb = async (userId, reportId, session) => {
  var report = await reportModel.findOneAndDelete({ userId, reportId }, { returnDocument: "before", session: session });

  return { reportBeforeDeletion: report };
};

export default deleteReportFromDb;
