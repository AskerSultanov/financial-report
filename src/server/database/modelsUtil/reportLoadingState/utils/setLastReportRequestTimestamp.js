import { reportLoadingStateModel } from "../../../models/index.js";

var setLastReportRequestTimestamp = async (userId, session) =>
  await reportLoadingStateModel.updateOne({ userId }, { $set: { lastReportRequestTimestamp: new Date() } }, { session: session });

export default setLastReportRequestTimestamp;
