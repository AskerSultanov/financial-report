import { reportTreeModel } from "../../../models/index.js";

var deleteReportFromReportTree = async (userId, year, month, reportId, session) => {
  var sessionOpt = session ? { session: session } : {};

  var result = await reportTreeModel.updateOne(
    {
      userId,
      "years.year": year,
      "years.months.month": month,
      "years.months.reportIds.reportId": reportId,
    },
    {
      $set: {
        "years.$[y].months.$[m].reportIds.$[r]": null,
      },
    },
    {
      arrayFilters: [{ "y.year": year }, { "m.month": month }, { "r.reportId": reportId }],
      ...sessionOpt,
    },
  );

  return result.modifiedCount;
};

export default deleteReportFromReportTree;
