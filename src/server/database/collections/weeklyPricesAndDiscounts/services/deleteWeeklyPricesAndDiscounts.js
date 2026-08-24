var deleteWeeklyPricesAndDiscounts = async (weeklyPricesAndDiscountsModel, userId) => {
  var result = await weeklyPricesAndDiscountsModel.updateOne({ userId }, { $set: { weeklyPricesAndDiscounts: [], uploadId: 0 } });

  return result;
};

export default deleteWeeklyPricesAndDiscounts;
