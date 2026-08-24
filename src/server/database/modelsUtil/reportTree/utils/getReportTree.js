import { reportTreeModel } from "../../../models/index.js";

var getReportTree = async (userId, session) => {
  var sessionOpt = session ? { session: session } : {};
  var data = await reportTreeModel.findOne({ userId }, null, { ...sessionOpt });

  return { reportTree: data.years };
};

export default getReportTree;
