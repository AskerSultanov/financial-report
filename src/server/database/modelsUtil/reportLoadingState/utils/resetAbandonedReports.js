import { reportLoadingStateModel } from "../../../models/index.js";

var resetAbandonedReports = async (userId) => await reportLoadingStateModel.updateOne({ userId }, { $set: { abandonedReports: [] } });

export default resetAbandonedReports;
