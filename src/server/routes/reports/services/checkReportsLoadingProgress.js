import dbUtils from "../../../database/modelsUtil/index.js";

var session = null;
var selectedFields = ["loadingInProgress"];

var { getReportLoadingState, prependToReportsQueue } =
  dbUtils.reportLoadingStateModelUtils;

var checkReportsLoadingProgressService = async (data) => {
  var { userId, dateFrom, dateTo } = data;

  var { loadingInProgress } = await getReportLoadingState(
    userId,
    session,
    selectedFields,
  );

  if (loadingInProgress) {
    await prependToReportsQueue(userId, dateFrom, dateTo);
  }

  return { loadingInProgress };
};

export default checkReportsLoadingProgressService;
