import dbUtils from "../../../database/collections/index.js";

var session = null;
var selectedFields = ["loadingInProgress"];

var { getReportLoadingState, prependToReportsQueue } = dbUtils.reportLoadingStatesCollectionServices;

var checkReportsLoadingProgress = async (req, res, next) => {
  var { userId, dateFrom, dateTo } = req.body;

  var { loadingInProgress } = await getReportLoadingState(userId, session, selectedFields);

  if (loadingInProgress) {
    await prependToReportsQueue(userId, dateFrom, dateTo);
    return res.status(202).json({ msg: "Отчет скоро будет добавлен." });
  }

  next();
};

export default checkReportsLoadingProgress;
