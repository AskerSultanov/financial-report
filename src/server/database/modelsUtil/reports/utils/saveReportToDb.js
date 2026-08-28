import { reportModel } from "../../../models/index.js";

var saveReportToDb = async (report, session) => {
  return await reportModel.create([report], { session: session });
};

export default saveReportToDb;
