var addReportToEmptyReportPeriods = async (reportLoadingStateModel, userId, dateFrom, dateTo, session) => {
  var sessionOptions = session ? { session } : {};

  await reportLoadingStateModel.updateOne({ userId }, { $push: { emptyReportPeriods: { dateFrom, dateTo } } }, { ...sessionOptions });
};

export default addReportToEmptyReportPeriods;
