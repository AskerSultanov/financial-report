import dbUtils from "../../../database/modelsUtil/index.js";
import sendResumeAbandonedReportsLoadingRequest from "../services/different/sendResumeAbandonedReportsLoadingRequest.js";

var session = null;
var needToResetAbandonedReports = true;

var resumeAbandonedReportsLoading = async (req, res) => {
  var { userId, abandonedReports, needToResumeLoading } = req.body;

  var success;

  if (needToResumeLoading) {
    await dbUtils.reportLoadingStateModelUtils.pushToReportsQueue(userId, abandonedReports, session, needToResetAbandonedReports);

    success = await sendResumeAbandonedReportsLoadingRequest(userId);
  } else {
    success = (await dbUtils.reportLoadingStateModelUtils.resetAbandonedReports(userId)).modifiedCount;
  }

  return success ? res.sendStatus(200) : res.sendStatus(304);
};

export default resumeAbandonedReportsLoading;
