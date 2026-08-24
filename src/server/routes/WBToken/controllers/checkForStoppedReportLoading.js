import dbUtils from "../../../database/modelsUtil/index.js";
import sendResumeLoadingRequest from "../services/sendResumeLoadingRequest.js";

var checkForStoppedReportLoading = async (req, res, next) => {
  var { userId } = req.body;

  var userReportLoadingState = await dbUtils.reportLoadingStateModelUtils.getReportLoadingState(userId);

  if (userReportLoadingState.isReportLoadingIsStopped) {
    await sendResumeLoadingRequest(userId);
  }
};

export default checkForStoppedReportLoading;
