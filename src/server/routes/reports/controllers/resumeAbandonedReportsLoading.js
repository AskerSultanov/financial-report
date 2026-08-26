import dbUtils from "../../../database/modelsUtil/index.js";
import sendResumeAbandonedReportsLoadingRequest from "../services/different/sendResumeAbandonedReportsLoadingRequest.js";

var { reportLoadingStateModelUtils } = dbUtils;

var resumeAbandonedReportsLoading = async (req, res) => {
  var { userId, needToResumeLoading } = req.body;

  var success = true;

  try {
    if (needToResumeLoading) {
      success = await sendResumeAbandonedReportsLoadingRequest(userId);
    } else {
      await reportLoadingStateModelUtils.resetAbandonedReports(userId);
    }
  } catch (e) {
    success = false;
  }

  return success ? res.sendStatus(200) : res.sendStatus(304);
};

export default resumeAbandonedReportsLoading;
