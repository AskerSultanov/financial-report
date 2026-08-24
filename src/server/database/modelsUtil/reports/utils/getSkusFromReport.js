import { reportModel } from "../../../models/index.js";

var getSkusFromReport = async (userId, reportId, skuNames, session) => {
  var data = await reportModel.aggregate(
    [
      { $match: { userId, reportId } },
      {
        $project: {
          userId: 1,
          report: {
            skus: { $filter: { input: "$skus", as: "sku", cond: { $in: ["$$sku.skuName", skuNames] } } },
          },
        },
      },
    ],
    { session },
  );

  return { report: data[0]?.report };
};

export default getSkusFromReport;
