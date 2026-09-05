import dbUtils from "../../../database/modelsUtil/index.js";

var session = null;
var selectedFields = ["loadingInProgress"];

var { getReportLoadingState, prependToReportsQueue } =
  dbUtils.reportLoadingStateModelUtils;

var checkReportsLoadingProgressController = async (req, res, next) => {
  var { userId, dateFrom, dateTo } = req.body;

  var { loadingInProgress } = await getReportLoadingState(
    userId,
    session,
    selectedFields,
  );

  if (loadingInProgress) {
    await prependToReportsQueue(userId, dateFrom, dateTo);

    return res.json({
      infoText: "Отчет скоро будет добавлен.",
      errorText: "",
      reportData: {},
    });
  }

  next();
};

export default checkReportsLoadingProgressController;
