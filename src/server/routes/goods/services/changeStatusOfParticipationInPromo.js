import dbUtils from "../../../database/modelsUtil/index.js";

var { updatePriceAndDiscount } = dbUtils.weeklyPricesAndDiscountsModelUtils;

var changeStatusOfParticipationInPromoService = async (data) => {
  var { userId, skuId, skuDataToUpdate, checkedWeekDays } = data;

  var success = await updatePriceAndDiscount(
    userId,
    skuId,
    skuDataToUpdate,
    checkedWeekDays,
  );

  return { success };
};

export default changeStatusOfParticipationInPromoService;
