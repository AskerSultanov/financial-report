import { reportLoadingStateModel } from "../../../models/index.js";

var getReportLoadingState = async (userId, session, selectedFields = [""]) => {
  var sessionOptions = session
    ? { session }
    : { readPreference: "secondaryPreferred" };

  var reportLoadingState = await reportLoadingStateModel
    .findOne({ userId }, { _id: 0 }, { ...sessionOptions })
    .select(selectedFields);

  return reportLoadingState?.toObject();
};

export default getReportLoadingState;
