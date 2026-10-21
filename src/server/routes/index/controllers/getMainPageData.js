import getMainPageDataService from "../services/getMainPageData.js";

var getMainPageDataController = async (req, res, next) => {
  var role = req?.payload?.role;
  var { userId } = req.params;

  var {
    reportTree,
    lastReports,
    reportLoadingState,
    reportLoadingStateUrl,
    reportsWithAccountedFinances,
  } = await getMainPageDataService(userId);

  return res.json({
    role,
    data: {
      reportTree,
      lastReports,
      reportLoadingState,
      reportLoadingStateUrl,
      reportsWithAccountedFinances,
    },
  });
};

export default getMainPageDataController;
