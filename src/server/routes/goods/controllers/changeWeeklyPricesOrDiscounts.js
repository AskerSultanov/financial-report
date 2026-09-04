import dbUtils from "../../../database/modelsUtil/index.js";

var { updatePriceAndDiscount } = dbUtils.weeklyPricesAndDiscountsModelUtils;

var changeWeeklyPricesOrDiscountsController = async (req, res, next) => {
  var { userId, skuId, skuDataToUpdate, checkedWeekDays } = req.body;

  await updatePriceAndDiscount(userId, skuId, skuDataToUpdate, checkedWeekDays);
  return res.sendStatus(200);
};

export default changeWeeklyPricesOrDiscountsController;
