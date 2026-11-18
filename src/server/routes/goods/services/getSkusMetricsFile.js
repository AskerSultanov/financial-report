import dbUtils from "../../../database/modelsUtil/index.js";
import generageSKusMetricsFile from "./utils/skusMetrics/index.js";
import sortSkusBySkuNameAndYear from "./utils/skusMetrics/sortSkusBySkuNameAndYear.js";
import mergeSkuDataBySkuNameAndYear from "./utils/skusMetrics/mergeSkuDataBySkuNameAndYear.js";

var { getListGoodsFromDb } = dbUtils.goodsModelUtils;
var { getReports } = dbUtils.basicReportsDataModelUtils;

var getSkusMetricsFileService = async (userId) => {
  var { reports } = await getReports(userId);
  var { listGoods } = await getListGoodsFromDb(userId);

  var { sortedSkusBySkuNameAndYear } = sortSkusBySkuNameAndYear(
    listGoods,
    reports,
  );
  var { mergedSkus } = mergeSkuDataBySkuNameAndYear(
    listGoods,
    sortedSkusBySkuNameAndYear,
  );

  var { skusMetricsFileBuffer } = await generageSKusMetricsFile(mergedSkus);

  return { skusMetricsFileBuffer };
};

export default getSkusMetricsFileService;
