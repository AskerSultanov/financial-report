var saveUpdatedReport = async (collection, userId, reportId, report) => {
  var result = await collection.updateOne(
    { userId, "reports.reportId": reportId },
    {
      $set: { "reports.$": report },
    },
  );

  return result.acknowledged;
};

export default saveUpdatedReport;
