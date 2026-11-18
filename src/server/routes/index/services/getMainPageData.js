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

var { getBasicReportsData } = dbUtils.basicReportsDataModelUtils;
var { getReportLoadingState } = dbUtils.reportLoadingStateModelUtils;

var getMainPageDataService = async (userId) => {
  var { basicReportData } = await getBasicReportsData(userId);

  var reportLoadingState = await getReportLoadingState(
    userId,
    session,
    selectedFieldsToLoadingState,
  );

  if (!basicReportData.length) {
    return {
      basicReportData: [],
      reportLoadingState,
    };
  }

  return {
    basicReportData,
    reportLoadingState,
  };
};

export default getMainPageDataService;
