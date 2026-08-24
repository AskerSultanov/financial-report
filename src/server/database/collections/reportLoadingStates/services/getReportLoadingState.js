var getReportLoadingState = async (reportLoadingStateModel, userId, session, selectedFields = [""]) => {
  var sessionOptions = session ? { session: session } : {};
  var doc = await reportLoadingStateModel.findOne({ userId }, { _id: 0 }, { ...sessionOptions }).select(selectedFields);
  return doc.toObject();
};

export default getReportLoadingState;
