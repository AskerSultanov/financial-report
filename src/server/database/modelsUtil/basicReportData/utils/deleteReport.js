import { skuModel, basicReportDataModel } from "../../../models/index.js";

var deleteReport = async (userId, reportId, session) => {
  var report = await basicReportDataModel.findOneAndDelete(
    { userId, reportId },
    { session, returnDocument: "before", populate: "skus" },
  );

  await skuModel.deleteMany({ userId, reportId }, { session });

  return { reportBeforeDeletion: report };
};

export default deleteReport;
