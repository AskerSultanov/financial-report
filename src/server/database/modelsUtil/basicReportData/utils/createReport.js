import { skuModel, basicReportDataModel } from "../../../models/index.js";

var createReport = async (basicReportData, skus, session) => {
  skus.forEach((sku) => {
    sku.userId = basicReportData.userId;
    sku.reportId = basicReportData.reportId;
  });

  var skuDocs = await skuModel.insertMany(skus, { session });
  var skuObjectIds = skuDocs.map((doc) => doc._id);

  basicReportData.skus = skuObjectIds;

  return await basicReportDataModel.insertOne(basicReportData, {
    session,
  });
};

export default createReport;
