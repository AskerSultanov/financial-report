var getEmptyReportPeriods = async (reportLoadingStateModel, userId, session) => {
  var sessionOptions = session ? { session } : {};

  var data = await reportLoadingStateModel.findOne({ userId }, null, { ...sessionOptions }).select("emptyReportPeriods");
  return { emptyReportPeriods: data?.emptyReportPeriods || [] };
};

export default getEmptyReportPeriods;
