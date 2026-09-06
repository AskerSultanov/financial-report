import dbUtils from "../../../database/modelsUtil/index.js";

var session = null;

var selectedFieldsToLoadingState = [
  "queueLength",
  "reportsQueue",
  "queueCapacity",
  "abandonedReports",
  "loadingInProgress",
  "loadingStopReason",
  "isReportLoadingIsStopped",
];

var getReportLoadingStateService = async (userId) => {
  var reportLoadingState =
    await dbUtils.reportLoadingStateModelUtils.getReportLoadingState(
      userId,
      session,
      selectedFieldsToLoadingState,
    );

  return { reportLoadingState };
};

export default getReportLoadingStateService;
