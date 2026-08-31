import { reportModel } from "../../../models/index.js";

var getSkusFromReport = async (userId, reportId, skuNames, session) => {
  var data = await reportModel.aggregate(
    [
      { $match: { userId, reportId } },
      {
        $project: {
          _id: 0,
          userId: 1,
          dateFrom: 1,
          dateTo: 1,
          isCrossYearPeriod: 1,
          skus: { $filter: { input: "$skus", as: "sku", cond: { $in: ["$$sku.skuName", skuNames] } } },
        },
      },
    ],
    { session },
  );

  return { report: data[0] };
};

export default getSkusFromReport;
