import dbUtils from "../../../database/modelsUtil/index.js";

var { updatePriceAndDiscount } = dbUtils.weeklyPricesAndDiscountsModelUtils;

var changeWeeklyPricesOrDiscountsService = async (data) => {
  var { userId, skuId, skuDataToUpdate, checkedWeekDays } = data;

  await updatePriceAndDiscount(userId, skuId, skuDataToUpdate, checkedWeekDays);
};

export default changeWeeklyPricesOrDiscountsService;
