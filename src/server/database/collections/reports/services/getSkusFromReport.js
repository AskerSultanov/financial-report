var getSkusFromReport = async (collection, userId, reportId, skuNames, session) => {
  var data = await collection.aggregate(
    [
      { $match: { userId, "reports.reportId": reportId } },
      { $unwind: "$reports" },
      { $match: { "reports.reportId": reportId } },
      {
        $project: {
          userId: 1,
          report: {
            $mergeObjects: ["$reports", { skus: { $filter: { input: "$reports.skus", as: "sku", cond: { $in: ["$$sku.skuName", skuNames] } } } }],
          },
        },
      },
    ],
    { session },
  );

  return { report: data[0]?.report };
};

export default getSkusFromReport;
