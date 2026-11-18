import getMainPageDataService from "../services/getMainPageData.js";

var getMainPageDataController = async (req, res, next) => {
  var { userId } = req.params;

  var { basicReportData, reportLoadingState } =
    await getMainPageDataService(userId);

  return res.json({
    data: {
      basicReportData,
      reportLoadingState,
    },
  });
};

export default getMainPageDataController;
