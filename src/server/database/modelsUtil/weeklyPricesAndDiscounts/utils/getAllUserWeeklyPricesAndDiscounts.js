import { weeklyPricesAndDiscountsModel } from "../../../models/index.js";

var getAllUserWeeklyPricesAndDiscounts = async () => {
  var data = await weeklyPricesAndDiscountsModel.find({}, { weeklyPricesAndDiscounts: 1, userId: 1, uploadId: 1, _id: 0 });

  return data;
};

export default getAllUserWeeklyPricesAndDiscounts;
