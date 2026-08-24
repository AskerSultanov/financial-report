var deleteReportLoadingStates = async (reportLoadingStateModel, userId, session) => {
  var sessionOptions = session ? { session } : {};

  await reportLoadingStateModel.updateOne(
    { userId },
    { $set: { reportsQueue: [], loadingInProgress: false, abandonedReports: [], freshReportPeriodIndex: -1 } },
    { ...sessionOptions },
  );
};

export default deleteReportLoadingStates;
