import { reportModel } from "../../../models/index.js";

var getSkuFromReport = async (userId, reportId, skuName, session) => {
  var sessionOpt = session ? { session } : {};

  var data = await reportModel.aggregate(
    [
      {
        $match: {
          userId,
          reportId,
        },
      },
      {
        $project: {
          userId: 1,
          report: {
            skus: {
              $filter: {
                input: "$skus",
                as: "sku",
                cond: { $eq: ["$$sku.skuName", skuName] },
              },
            },
          },
        },
      },
    ],
    { ...sessionOpt },
  );

  return { report: data[0]?.report };
};

export default getSkuFromReport;
