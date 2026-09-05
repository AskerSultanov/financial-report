import sendResumeLoadingRequest from "../services/utils/sendResumeLoadingRequest.js";
import { getReportLoadingState } from "../../../database/modelsUtil/reportLoadingState/index.js";

var checkForStoppedReportLoadingController = async (req, res, next) => {
  var { userId } = req.body;

  var userReportLoadingState = await getReportLoadingState(userId);

  if (userReportLoadingState.isReportLoadingIsStopped) {
    await sendResumeLoadingRequest(userId);
  }
};

export default checkForStoppedReportLoadingController;
