import wbapi from "../../reports/services/WBAPI/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";

var setNewPricesAndDiscountsToSkuController = async (req, res, next) => {
  var {
    userId,
    skuName,
    skuDataToUpdate,
    setNewPriceNow,
    expectedPriceExists,
    wbtoken,
  } = req.body;

  try {
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
  } catch (e) {
    console.log(e);

    return res.json({
      errorText: "Произошла ошибка при попытке установить цену...",
    });
  }

  if (!expectedPriceExists) {
    return res.json({ errorText: "" });
  }

  next();
};

export default setNewPricesAndDiscountsToSkuController;
