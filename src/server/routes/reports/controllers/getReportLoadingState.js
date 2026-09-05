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

var getReportLoadingStateController = async (req, res, next) => {
  var { userId } = req.params;

  var reportLoadingState =
    await dbUtils.reportLoadingStateModelUtils.getReportLoadingState(
      userId,
      session,
      selectedFieldsToLoadingState,
    );

  return res.json(reportLoadingState);
};

export default getReportLoadingStateController;
