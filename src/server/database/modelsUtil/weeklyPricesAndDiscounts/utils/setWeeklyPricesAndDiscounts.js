import { weeklyPricesAndDiscountsModel } from "../../../models/index.js";

var setWeeklyPricesAndDiscounts = async (userId, weeklyPricesAndDiscounts, session) => {
  var result = await weeklyPricesAndDiscountsModel.updateOne({ userId }, { $set: { weeklyPricesAndDiscounts } }, { session: session });
  return result.acknowledged;
};

export default setWeeklyPricesAndDiscounts;
