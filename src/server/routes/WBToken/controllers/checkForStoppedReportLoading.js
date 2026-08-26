import sendResumeLoadingRequest from "../services/sendResumeLoadingRequest.js";
import { getReportLoadingState } from "../../../database/modelsUtil/reportLoadingState/index.js";

var checkForStoppedReportLoading = async (req, res, next) => {
  var { userId } = req.body;

  var userReportLoadingState = await getReportLoadingState(userId);

  if (userReportLoadingState.isReportLoadingIsStopped) {
    await sendResumeLoadingRequest(userId);
  }
};

export default checkForStoppedReportLoading;
