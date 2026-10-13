import resetReportService from "../services/resetReport.js";

var resetReportController = async (req, res, next) => {
  var { userId, reportId } = req.body;
  await resetReportService(userId, reportId);

  return res.sendStatus(200);
};

export default resetReportController;
