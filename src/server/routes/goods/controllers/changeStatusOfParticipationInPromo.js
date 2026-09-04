import dbUtils from "../../../database/modelsUtil/index.js";

var { updatePriceAndDiscount } = dbUtils.weeklyPricesAndDiscountsModelUtils;

var changeStatusOfParticipationInPromoController = async (req, res, next) => {
  var { userId, skuId, skuDataToUpdate, checkedWeekDays } = req.body;

  var success = await updatePriceAndDiscount(userId, skuId, skuDataToUpdate, checkedWeekDays);

  return success ? res.sendStatus(200) : res.sendStatus(304);
};

export default changeStatusOfParticipationInPromoController;
