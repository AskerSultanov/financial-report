var getAllUserWeeklyPricesAndDiscounts = async (weeklyPricesAndDiscountsModel) => {
  var data = await weeklyPricesAndDiscountsModel.find({}, { weeklyPricesAndDiscounts: 1, userId: 1, uploadId: 1, _id: 0 });

  return data;
};

export default getAllUserWeeklyPricesAndDiscounts;
