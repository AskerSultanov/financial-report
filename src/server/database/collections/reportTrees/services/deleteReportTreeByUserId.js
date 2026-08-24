var deleteReportTreeByUserId = async (reportTreeModel, userId) => {
  var result = await reportTreeModel.updateOne(
    { userId },
    {
      $set: { years: [] },
    },
  );

  return result.modifiedCount;
};

export default deleteReportTreeByUserId;
