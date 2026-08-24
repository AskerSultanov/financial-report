var setUploadId = async (weeklyPricesAndDiscountsModel, userId, uploadId, session) => {
  var sessionOpt = session ? { session: session } : {};
  return await weeklyPricesAndDiscountsModel.updateOne({ userId }, { $set: { uploadId } }, { ...sessionOpt });
};

export default setUploadId;
