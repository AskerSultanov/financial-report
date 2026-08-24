import { reportLoadingStateModel } from "../../../models/index.js";

var deletereportLoadingState = async (userId, session) => {
  var sessionOptions = session ? { session } : {};

  await reportLoadingStateModel.updateOne(
    { userId },
    { $set: { reportsQueue: [], loadingInProgress: false, abandonedReports: [], freshReportPeriodIndex: -1 } },
    { ...sessionOptions },
  );
};

export default deletereportLoadingState;
