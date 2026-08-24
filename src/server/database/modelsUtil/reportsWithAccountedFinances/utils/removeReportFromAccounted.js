import { reportsWithAccountedFinancesModel } from "../../../models/index.js";

var removeReportFromAccounted = async (userId, reportId) => {
  return await reportsWithAccountedFinancesModel.deleteOne({ userId, reportId });
};

export default removeReportFromAccounted;
