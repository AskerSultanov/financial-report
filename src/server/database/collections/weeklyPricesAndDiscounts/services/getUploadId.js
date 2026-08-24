var getUploadId = async (weeklyPricesAndDiscountsModel, userId) => {
  var { uploadId } = await weeklyPricesAndDiscountsModel.findOne({ userId });

  return { uploadId };
};

export default getUploadId;
