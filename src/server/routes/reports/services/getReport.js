import dbUtils from "../../../database/modelsUtil/index.js";
import getSignedUrlsToSkuImages from "./utils/different/getSignedUrlsToSkuImages.js";
import filterCostsForReportSkus from "./utils/different/filterCostsForReportSkus.js";

var { getListGoodsFromDb } = dbUtils.goodsModelUtils;
var { getReport } = dbUtils.basicReportsDataModelUtils;

var selectedFields = { "listGoods.skuName": 1, "listGoods.lastCostPrice": 1 };

var getReportService = async (data) => {
  var { userId, reportId } = data;

  var { report } = await getReport(userId, reportId);

  if (!report) {
    return {
      report: {},
      signedUrls: [],
      reportNotFound: true,
      lastCostPrices: [],
    };
  }

  var { signedUrls } = await getSignedUrlsToSkuImages(userId, report.skus);

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
    signedUrls,
    reportNotFound: false,
    lastCostPrices: filteredSkusWithLastCostPrices,
  };
};

export default getReportService;
