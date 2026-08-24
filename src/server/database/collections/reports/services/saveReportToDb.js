var saveReportToDb = async (reportModel, userId, report, session) => {
  var result = await reportModel.updateOne(
    { userId },
    {
      $push: {
        reports: { $each: [report], $position: 0 },
      },
    },
    {
      session: session,
    },
  );

  return result.acknowledged;
};

export default saveReportToDb;
