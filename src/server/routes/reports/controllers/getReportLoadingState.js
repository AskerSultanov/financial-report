import getReportLoadingStateService from "../services/getReportLoadingState.js";

var getReportLoadingStateController = async (req, res, next) => {
  var { userId } = req.params;

  var { reportLoadingState } = await getReportLoadingStateService(userId);

  return res.json(reportLoadingState);
};

export default getReportLoadingStateController;
