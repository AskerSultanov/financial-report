import { basicReportDataModel } from "../../../models/index.js";

var updateReport = async (userId, reportId, updatedFields, session) => {
  var sessionOptions = session ? { session } : {};

  return await basicReportDataModel.updateOne(
    { userId, reportId },
    { $set: updatedFields },
    { ...sessionOptions },
  );
};

export default updateReport;
