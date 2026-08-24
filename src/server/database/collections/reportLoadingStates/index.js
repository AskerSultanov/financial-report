import { reportLoadingStateModel } from "../../models/index.js";

import pushToReportsQueue from "./services/pushToReportsQueue.js";
import getReportLoadingState from "./services/getReportLoadingState.js";
import resetAbandonedReports from "./services/resetAbandonedReports.js";
import prependToReportsQueue from "./services/prependToReportsQueue.js";
import getEmptyReportPeriods from "./services/getEmptyReportPeriods.js";
import deleteReportLoadingStates from "./services/deleteReportLoadingStates.js";
import setLastReportRequestTimestamp from "./services/setLastReportRequestTimestamp.js";
import addReportToEmptyReportPeriods from "./services/addReportToEmptyReportPeriods.js";
import updateReportLoadingStoppedStatus from "./services/updateReportLoadingStoppedStatus.js";

var reportLoadingStatesCollectionServices = {
  getEmptyReportPeriods: (userId, session) => getEmptyReportPeriods(reportLoadingStateModel, userId, session),
  getReportLoadingState: (userId, session, selectedFields) => getReportLoadingState(reportLoadingStateModel, userId, session, selectedFields),
  deleteReportLoadingStates: (userId, session) => deleteReportLoadingStates(reportLoadingStateModel, userId, session),
  prependToReportsQueue: (userId, dateFrom, dateTo) => prependToReportsQueue(reportLoadingStateModel, userId, dateFrom, dateTo),
  setLastReportRequestTimestamp: (userId, session) => setLastReportRequestTimestamp(reportLoadingStateModel, userId, session),

  addReportToEmptyReportPeriods: (userId, dateFrom, dateTo, session) =>
    addReportToEmptyReportPeriods(reportLoadingStateModel, userId, dateFrom, dateTo, session),

  pushToReportsQueue: (userId, periods, session, needToResetAbandonedReports) =>
    pushToReportsQueue(reportLoadingStateModel, userId, periods, session, needToResetAbandonedReports),

  updateReportLoadingStoppedStatus: (userId, newStatus, loadingStopReason, session) =>
    updateReportLoadingStoppedStatus(reportLoadingStateModel, userId, newStatus, loadingStopReason, session),

  resetAbandonedReports: (userId) => resetAbandonedReports(reportLoadingStateModel, userId),
};

export default reportLoadingStatesCollectionServices;
