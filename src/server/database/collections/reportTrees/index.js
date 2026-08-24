import { reportTreeModel } from "../../models/index.js";

import getReportTree from "./services/getReportTree.js";
import updateReportTree from "./services/updateReportTree.js";
import deleteReportTreeByUserId from "./services/deleteReportTreeByUserId.js";
import deleteReportFromReportTree from "./services/deleteReportFromReportTree.js";

var reportsTreeCollectionServices = {
  updateReportTree: (userId, years, session) => updateReportTree(reportTreeModel, userId, years, session),

  getReportTree: (userId, session) => getReportTree(reportTreeModel, userId, session),

  deleteReportFromReportTree: (userId, year, month, reportId, session) =>
    deleteReportFromReportTree(reportTreeModel, userId, year, month, reportId, session),

  deleteReportTreeByUserId: (userId) => deleteReportTreeByUserId(reportTreeModel, userId),
};

export default reportsTreeCollectionServices;
