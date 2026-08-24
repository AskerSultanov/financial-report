var mskTimeOffsetInMs = 10_800_000;

var addReportToAccounted = async (reportModel, userId, reportId) => {
  return await reportModel.updateMany({ userId, "reports.reportId": reportId }, [
    {
      $set: {
        reports: {
          $map: {
            input: "$reports",
            as: "report",
            in: {
              $cond: {
                if: { $eq: ["$$report.reportId", reportId] },
                then: {
                  $mergeObjects: ["$$report", { isFinancesAccounted: true }],
                },
                else: "$$report",
              },
            },
          },
        },
        "temp.targetReport": {
          $arrayElemAt: [
            {
              $filter: {
                input: "$reports",
                as: "report",
                cond: { $eq: ["$$report.reportId", reportId] },
              },
            },
            0,
          ],
        },
      },
    },
    {
      $set: {
        reportsWithAccountedFinances: {
          $concatArrays: [
            { $ifNull: ["$reportsWithAccountedFinances", []] },
            [
              {
                userId,
                reportId,
                dateFrom: "$temp.targetReport.dateFrom",
                dateTo: "$temp.targetReport.dateTo",
                financesAccountedAt: Date.now() + mskTimeOffsetInMs,
              },
            ],
          ],
        },
      },
    },
    { $unset: "temp" },
  ]);
};

export default addReportToAccounted;
