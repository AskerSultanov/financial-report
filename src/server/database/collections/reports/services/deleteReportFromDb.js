var deleteReportFromDb = async (reportModel, userId, reportId, session) => {
  var { reports } = await reportModel.findOneAndUpdate(
    { userId },
    { $pull: { reports: { reportId }, reportsWithAccountedFinances: { reportId } } },
    { returnDocument: "before", session: session },
  );

  var reportBeforeDeletion = reports.find((report) => report.reportId === reportId).toObject();

  return { reportBeforeDeletion };
};

export default deleteReportFromDb;
