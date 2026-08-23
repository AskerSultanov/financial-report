var getReportsByUserId = async (collection, userId, session, selectedFields, reportIds) => {
  var sessionOptions = session ? { session } : {};

  if (reportIds) {
    var projectFields = {};

    selectedFields.map((field) => {
      var key = field.split(".")[1];
      projectFields[key] = "$$r." + key;
    });

    var data = await collection
      .aggregate([
        {
          $match: {
            userId,
            "reports.reportId": { $in: reportIds },
          },
        },
        {
          $project: {
            reports: {
              $map: {
                input: {
                  $filter: {
                    input: "$reports",
                    cond: { $in: ["$$this.reportId", reportIds] },
                  },
                },
                as: "r",
                in: projectFields,
              },
            },
            reportsWithAccountedFinances: 1,
          },
        },
      ])
      .session(session);

    return { reports: data[0].reports, reportsWithAccountedFinances: data[0]?.reportsWithAccountedFinances || [] };
  }

  if (selectedFields) {
    var { reports } = await collection.findOne({ userId }, null, { ...sessionOptions }).select(selectedFields);

    return { reports };
  }

  var data = await collection.findOne({ userId }, null, { ...sessionOptions });

  return { reports: data.toObject().reports };
};
export default getReportsByUserId;
