import { weeklyPricesAndDiscountsModel } from "../../../models/index.js";

var getWeeklyPricesAndDiscounts = async (userId) => {
  var { weeklyPricesAndDiscounts } = await weeklyPricesAndDiscountsModel.findOne({ userId });
  return { weeklyPricesAndDiscounts };
};

export default getWeeklyPricesAndDiscounts;
