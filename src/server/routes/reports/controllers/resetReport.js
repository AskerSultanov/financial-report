import resetReportService from "../services/resetReport.js";

var resetReportController = async (req, res, next) => {
  var { userId, reportId } = req.body;
  var { reportNotFound } = await resetReportService(userId, reportId);

  if (reportNotFound) {
    return res.sendStatus(404);
  }

  return res.sendStatus(200);
};

export default resetReportController;
