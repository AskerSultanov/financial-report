import { reportLoadingStatesCollection } from "../../connections/index.js";

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
  getEmptyReportPeriods: (userId, session) => getEmptyReportPeriods(reportLoadingStatesCollection, userId, session),
  getReportLoadingState: (userId, session, selectedFields) => getReportLoadingState(reportLoadingStatesCollection, userId, session, selectedFields),
  deleteReportLoadingStates: (userId, session) => deleteReportLoadingStates(reportLoadingStatesCollection, userId, session),
  prependToReportsQueue: (userId, dateFrom, dateTo) => prependToReportsQueue(reportLoadingStatesCollection, userId, dateFrom, dateTo),
  setLastReportRequestTimestamp: (userId, session) => setLastReportRequestTimestamp(reportLoadingStatesCollection, userId, session),

  addReportToEmptyReportPeriods: (userId, dateFrom, dateTo, session) =>
    addReportToEmptyReportPeriods(reportLoadingStatesCollection, userId, dateFrom, dateTo, session),

  pushToReportsQueue: (userId, periods, session, needToResetAbandonedReports) =>
    pushToReportsQueue(reportLoadingStatesCollection, userId, periods, session, needToResetAbandonedReports),

  updateReportLoadingStoppedStatus: (userId, newStatus, loadingStopReason, session) =>
    updateReportLoadingStoppedStatus(reportLoadingStatesCollection, userId, newStatus, loadingStopReason, session),

  resetAbandonedReports: (userId) => resetAbandonedReports(reportLoadingStatesCollection, userId),
};

export default reportLoadingStatesCollectionServices;
