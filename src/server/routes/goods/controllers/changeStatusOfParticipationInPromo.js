import dbUtils from "../../../database/collections/index.js";

var { updatePriceAndDiscount } = dbUtils.weeklyPricesAndDiscountsCollectionServices;

var changeStatusOfParticipationInPromo = async (req, res, next) => {
  var { userId, skuId, skuDataToUpdate, checkedWeekDays } = req.body;

  var success = await updatePriceAndDiscount(userId, skuId, skuDataToUpdate, checkedWeekDays);

  return success ? res.sendStatus(200) : res.sendStatus(304);
};

export default changeStatusOfParticipationInPromo;
