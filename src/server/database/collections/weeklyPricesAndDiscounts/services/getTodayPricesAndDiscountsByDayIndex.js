var getTodayPricesAndDiscountsByDayIndex = async (weeklyPricesAndDiscountsModel, currentdayIndex) =>
  await weeklyPricesAndDiscountsModel.aggregate([
    {
      $project: { _id: 0, userId: 1, currentDayPricesAndDiscounts: { $arrayElemAt: ["$weeklyPricesAndDiscounts", currentdayIndex] } },
    },
  ]);

export default getTodayPricesAndDiscountsByDayIndex;
