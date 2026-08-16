import { ReportNotFoundError } from "../../../../customError/index.js";

var getReportById = async (collection, userId, reportId, session) => {
  var sessionOpt = session ? { session: session } : {};
  try {
    var data = await collection.findOne({ userId, "reports.reportId": reportId }, { "reports.$": 1 }, { ...sessionOpt });

    if (!data?.reports.length) {
      throw new ReportNotFoundError(userId, reportId);
    }

    return { report: data.reports[0].toObject() };
  } catch (e) {
    if (e instanceof ReportNotFoundError) {
      throw e;
    }
  }
};

export default getReportById;
