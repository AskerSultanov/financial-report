var checkReportExistsToDb = async (reportModel, userId, dateFrom, dateTo) => {
  var report = await reportModel.findOne({ userId, "reports.dateFrom": dateFrom, "reports.dateTo": dateTo });

  return report;
};

export default checkReportExistsToDb;
