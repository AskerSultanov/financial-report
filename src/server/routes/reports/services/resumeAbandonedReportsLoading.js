import dbUtils from "../../../database/modelsUtil/index.js";
import sendResumeAbandonedReportsLoadingRequest from "./utils/different/sendResumeAbandonedReportsLoadingRequest.js";

var { reportLoadingStateModelUtils } = dbUtils;

var resumeAbandonedReportsLoadingService = async (data) => {
  var { userId, needToResumeLoading } = data;

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

  return { success };
};

export default resumeAbandonedReportsLoadingService;
