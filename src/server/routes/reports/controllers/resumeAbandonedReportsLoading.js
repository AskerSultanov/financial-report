import resumeAbandonedReportsLoadingService from "../services/resumeAbandonedReportsLoading.js";

var resumeAbandonedReportsLoadingController = async (req, res) => {
  var { success } = await resumeAbandonedReportsLoadingService(req.body);

  return success ? res.sendStatus(200) : res.sendStatus(304);
};

export default resumeAbandonedReportsLoadingController;
