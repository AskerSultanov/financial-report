import getMainPageDataService from "../services/getMainPageData.js";

var getMainPageDataController = async (req, res, next) => {
  var { userId } = req.params;

  var {
    reportTree,
    lastReports,
    reportLoadingState,
    reportLoadingStateUrl,
    reportsWithAccountedFinances,
  } = await getMainPageDataService(userId);

  return res.json({
    reportTree,
    lastReports,
    reportLoadingState,
    reportLoadingStateUrl,
    reportsWithAccountedFinances,
  });
};

export default getMainPageDataController;
