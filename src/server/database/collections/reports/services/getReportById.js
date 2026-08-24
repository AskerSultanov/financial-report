var getReportById = async (reportModel, userId, reportId, session) => {
  var sessionOpt = session ? { session: session } : {};
  var data = await reportModel.findOne({ userId, "reports.reportId": reportId }, { "reports.$": 1 }, { ...sessionOpt });

  return { report: data?.reports[0].toObject() };
};

export default getReportById;
