var saveReportToDb = async (collection, userId, report, session) => {
  var result = await collection.updateOne(
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
