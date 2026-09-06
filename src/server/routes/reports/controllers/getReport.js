import getReportService from "../services/getReport.js";

var getReportController = async (req, res, next) => {
  var { report, reportNotFound, skuImages, skusWithLastCostPrices } =
    await getReportService(req.params);

  if (reportNotFound) {
    return res.sendStatus(404);
  }

  return res.json({
    report,
    skuImages,
    skusWithLastCostPrices,
  });
};

export default getReportController;
