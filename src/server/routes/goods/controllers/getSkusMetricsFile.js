import dbUtils from "../../../database/modelsUtil/index.js";
import generageSKusMetricsFile from "../services/skusMetrics/index.js";
import sortSkusBySkuNameAndYear from "../services/skusMetrics/sortSkusBySkuNameAndYear.js";
import mergeSkuDataBySkuNameAndYear from "../services/skusMetrics/mergeSkuDataBySkuNameAndYear.js";

var { getListGoodsFromDb } = dbUtils.goodsModelUtils;
var { getReportsByUserId } = dbUtils.reportModelUtils;

var getSkusMetricsFileController = async (req, res, next) => {
  var { userId } = req.params;

  var { reports } = await getReportsByUserId(userId);
  var { listGoods } = await getListGoodsFromDb(userId);

  var { sortedSkusBySkuNameAndYear } = sortSkusBySkuNameAndYear(listGoods, reports);
  var { mergedSkus } = mergeSkuDataBySkuNameAndYear(listGoods, sortedSkusBySkuNameAndYear);

  var { skusMetricsFileBuffer } = await generageSKusMetricsFile(mergedSkus);

  res.set({
    "Content-Disposition": 'attachment; filename="file.xlsx"',
    "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  res.send(skusMetricsFileBuffer);
};

export default getSkusMetricsFileController;
