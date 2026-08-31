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
          _id: 0,
          userId: 1,
          dateFrom: 1,
          dateTo: 1,
          isCrossYearPeriod: 1,
          skus: {
            $filter: {
              input: "$skus",
              as: "sku",
              cond: { $eq: ["$$sku.skuName", skuName] },
            },
          },
        },
      },
    ],
    { ...sessionOpt },
  );

  return { report: data[0] };
};

export default getSkuFromReport;
