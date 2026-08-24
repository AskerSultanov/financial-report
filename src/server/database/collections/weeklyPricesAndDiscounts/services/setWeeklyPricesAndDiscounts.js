var setWeeklyPricesAndDiscounts = async (weeklyPricesAndDiscountsModel, userId, weeklyPricesAndDiscounts, session) => {
  var result = await weeklyPricesAndDiscountsModel.updateOne({ userId }, { $set: { weeklyPricesAndDiscounts } }, { session: session });
  return result.acknowledged;
};

export default setWeeklyPricesAndDiscounts;
