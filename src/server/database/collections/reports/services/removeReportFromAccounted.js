var removeReportFromAccounted = async (reportModel, userId, reportId) => {
  return await reportModel.updateOne(
    { userId, "reports.reportId": reportId },
    { $set: { "reports.$.isFinancesAccounted": false }, $pull: { reportsWithAccountedFinances: { reportId } } },
  );
};

export default removeReportFromAccounted;
