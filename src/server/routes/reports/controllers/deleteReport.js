import deleteReportService from "../services/deleteReport.js";

var deleteReportController = async (req, res, next) => {
  var { reportDeleted, reportNotFound } = await deleteReportService(req.body);

  if (reportNotFound) {
    return res.sendStatus(404);
  }

  if (reportDeleted) {
    return res.sendStatus(200);
  }
};

export default deleteReportController;
