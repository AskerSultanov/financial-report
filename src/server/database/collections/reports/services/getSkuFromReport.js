var getSkuFromReport = async (collection, userId, reportId, skuName, session = {}) => {
  var data = await collection.aggregate(
    [
      {
        $match: {
          userId,
          "reports.reportId": reportId,
        },
      },
      { $unwind: "$reports" },
      { $match: { "reports.reportId": reportId } },
      {
        $project: {
          userId: 1,
          report: {
            $mergeObjects: [
              "$reports",
              {
                skus: {
                  $filter: {
                    input: "$reports.skus",
                    as: "sku",
                    cond: { $eq: ["$$sku.skuName", skuName] },
                  },
                },
              },
            ],
          },
        },
      },
    ],
    { session },
  );

  return { report: data[0]?.report };
};

export default getSkuFromReport;
