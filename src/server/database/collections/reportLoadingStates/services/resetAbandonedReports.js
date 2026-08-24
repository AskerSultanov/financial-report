var resetAbandonedReports = async (reportLoadingStateModel, userId) =>
  await reportLoadingStateModel.updateOne({ userId }, { $set: { abandonedReports: [] } });

export default resetAbandonedReports;
