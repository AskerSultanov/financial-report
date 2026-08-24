var updateReportsTree = async (reportTreeModel, userId, years, session) => {
  var sessionOptions = session ? { session } : {};

  var result = await reportTreeModel.updateOne(
    { userId },
    {
      $set: { years: years },
    },
    {
      ...sessionOptions,
    },
  );

  return result.modifiedCount;
};
export default updateReportsTree;
