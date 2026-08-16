var checkReportExistsToDb = async (collection, userId, dateFrom, dateTo) => {
  var report = await collection.findOne({ userId, "reports.dateFrom": dateFrom, "reports.dateTo": dateTo });

  return report;
};

export default checkReportExistsToDb;
