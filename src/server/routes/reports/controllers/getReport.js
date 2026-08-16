import dbUtils from "../../../database/collections/index.js";
import collectImagesAsBase64 from "../services/different/collectImagesAsBase64.js";
import filterCostsForReportSkus from "../services/different/filterCostsForReportSkus.js";

var { getReportById } = dbUtils.reportCollectionServices;
var { getSkusLastCostPrice } = dbUtils.goodsCollectionServices;

var getReport = async (req, res, next) => {
  var { userId, reportId } = req.params;

  var { report } = await getReportById(userId, reportId);

  if (!report) {
    return res.sendStatus(404);
  }

  var { skusLastCostPrice } = await getSkusLastCostPrice(userId);

  var { skuImages } = await collectImagesAsBase64(userId, report.skus);

  var { skusLastCostPrice } = await filterCostsForReportSkus(report.skus, skusLastCostPrice);

  return res.json({ report, skuImages, skusLastCostPrice });
};

export default getReport;
