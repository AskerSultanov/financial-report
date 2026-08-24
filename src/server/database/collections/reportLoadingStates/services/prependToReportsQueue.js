var prependToReportsQueue = async (reportLoadingStateModel, userId, dateFrom, dateTo) => {
  var result = await reportLoadingStateModel.updateOne(
    { userId },
    { $push: { reportsQueue: { $each: [{ dateFrom, dateTo }], $position: 0 } }, $inc: { queueLength: 1, queueCapacity: 1 } },
  );
  return result;
};

export default prependToReportsQueue;
