import dbUtils from "../../../database/collections/index.js";
import collectImagesAsBase64 from "../services/different/collectImagesAsBase64.js";
import filterCostsForReportSkus from "../services/different/filterCostsForReportSkus.js";

var { getReportById } = dbUtils.reportCollectionServices;
var { getSkusLastCostPrice, getListGoodsFromDb } = dbUtils.goodsCollectionServices;

var selectedFields = ["listGoods.id", "listGoods.skuName", "listGoods.lastCostPrice"];

var getReport = async (req, res, next) => {
  var { userId, reportId } = req.params;

  var { report } = await getReportById(userId, reportId);

  if (!report) {
    return res.sendStatus(404);
  }

  var { skuImages } = await collectImagesAsBase64(userId, report.skus);

  var skuNames = report.skus.map((sku) => sku.skuName);
  var { listGoods } = await getListGoodsFromDb(userId, skuNames, selectedFields);

  var { filteredSkusWithLastCostPrices } = filterCostsForReportSkus(report.skus, listGoods);

  return res.json({ report, skuImages, skusWithLastCostPrices: filteredSkusWithLastCostPrices });
};

export default getReport;
