import { weeklyPricesAndDiscountsModel } from "../../../models/index.js";

var createQuery = (skuId, skuDataToUpdate, checkedWeekDays) => {
  var query = {};
  var arrayFilters = [];

  var count = 0;
  for (var weekDayId of checkedWeekDays) {
    for (var key of Object.keys(skuDataToUpdate)) {
      var queryKey = `weeklyPricesAndDiscounts.${weekDayId}.$[elem${count}].${key}`;
      query[queryKey] = skuDataToUpdate[key];
    }

    var optionKey = `elem${count}.nmID`;

    arrayFilters.push({ [optionKey]: skuId });

    count++;
  }

  return { query, arrayFilters };
};

var updatePriceAndDiscount = async (userId, skuId, skuDataToUpdate, checkedWeekDays) => {
  var { query, arrayFilters } = createQuery(skuId, skuDataToUpdate, checkedWeekDays);

  var result = await weeklyPricesAndDiscountsModel.updateOne({ userId }, { $set: query }, { arrayFilters });

  return result?.acknowledged;
};

export default updatePriceAndDiscount;
