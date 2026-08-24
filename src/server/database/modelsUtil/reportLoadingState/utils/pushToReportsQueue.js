import { reportLoadingStateModel } from "../../../models/index.js";

var pushToReportsQueue = async (userId, periods, session, needToResetAbandonedReports = false) => {
  var sessionOpt = session ? { session } : {};

  if (needToResetAbandonedReports) {
    await reportLoadingStateModel.updateOne(
      { userId },
      { $push: { reportsQueue: { $each: [...periods] } }, $set: { abandonedReports: [] } },
      { ...sessionOpt },
    );
  } else {
    await reportLoadingStateModel.updateOne({ userId }, { $push: { reportsQueue: { $each: [...periods] } } }, { ...sessionOpt });
  }
};

export default pushToReportsQueue;
