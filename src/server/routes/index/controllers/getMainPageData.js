import getMainPageDataService from "../services/getMainPageData.js";

var getMainPageDataController = async (req, res, next) => {
  var { userId } = req.params;

  var { reportTree, reportLoadingState, reportsWithAccountedFinances } =
    await getMainPageDataService(userId);

  return res.json({
    data: {
      reportTree,
      reportLoadingState,
      reportsWithAccountedFinances,
    },
  });
};

export default getMainPageDataController;
