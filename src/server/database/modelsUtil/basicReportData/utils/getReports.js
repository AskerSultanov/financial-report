import { basicReportDataModel } from "../../../models/index.js";

var getReports = async (userId, session, selectedFields = null, reportIds) => {
  var sessionOptions = session
    ? { session }
    : { readPreference: "secondaryPreferred" };

  if (reportIds) {
    var data = await basicReportDataModel
      .find({
        userId,
        reportId: { $in: reportIds },
      })
      .populate("skus");

    return { reports: data };
  }

  if (selectedFields) {
    var { reports } = await basicReportDataModel
      .find({ userId }, null, { ...sessionOptions })
      .populate("skus")
      .select(selectedFields);

    return { reports };
  }

  var reports = await basicReportDataModel
    .find({ userId }, null, {
      ...sessionOptions,
    })
    .populate("skus");

  return { reports };
};

export default getReports;
