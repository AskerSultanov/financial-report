import wbapi from "../../reports/services/utils/WBAPI/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";

var setNewPricesAndDiscountsToSkuService = async (data) => {
  var {
    userId,
    skuName,
    skuDataToUpdate,
    setNewPriceNow,
    expectedPriceExists,
    wbtoken,
  } = data;

  if (setNewPriceNow) {
    var data = [skuDataToUpdate];
    await wbapi.setPricesAndDiscounts(userId, wbtoken, data);

    await dbUtils.goodsModelUtils.updateSkuInListGoods(
      userId,
      skuName,
      {
        price: skuDataToUpdate.data.price,
        discount: skuDataToUpdate.data.discount,
      },
      session,
    );
  }

  if (!expectedPriceExists) {
    return { callNext: false, errorText: "" };
  }

  return { callNext: true, errorText: "" };
};

export default setNewPricesAndDiscountsToSkuService;
