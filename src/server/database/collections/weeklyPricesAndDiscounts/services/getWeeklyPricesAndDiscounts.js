var getWeeklyPricesAndDiscounts = async (weeklyPricesAndDiscountsModel, userId) => {
  var { weeklyPricesAndDiscounts } = await weeklyPricesAndDiscountsModel.findOne({ userId });
  return { weeklyPricesAndDiscounts };
};

export default getWeeklyPricesAndDiscounts;
