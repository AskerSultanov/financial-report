import dbUtils from "../../../database/modelsUtil/index.js";
import collectImagesAsBase64 from "./utils/different/collectImagesAsBase64.js";
import filterCostsForReportSkus from "./utils/different/filterCostsForReportSkus.js";

var { getReportById } = dbUtils.reportModelUtils;
var { getListGoodsFromDb } = dbUtils.goodsModelUtils;

var selectedFields = { "listGoods.skuName": 1, "listGoods.lastCostPrice": 1 };

var getReportService = async (data) => {
  var { userId, reportId } = data;

  var { report } = await getReportById(userId, reportId);

  if (!report) {
    return {
      report: {},
      skuImages: [],
      reportNotFound: true,
      skusWithLastCostPrices: [],
    };
  }

  var { skuImages } = await collectImagesAsBase64(userId, report.skus);

  var skuNames = report.skus.map((sku) => sku.skuName);

  var { listGoods } = await getListGoodsFromDb(
    userId,
    skuNames,
    selectedFields,
  );

  var { filteredSkusWithLastCostPrices } = filterCostsForReportSkus(
    report.skus,
    listGoods,
  );

  return {
    report,
    skuImages,
    reportNotFound: false,
    skusWithLastCostPrices: filteredSkusWithLastCostPrices,
  };
};

export default getReportService;
