import dbUtils from "../../../database/modelsUtil/index.js";
import splitSkuByDisabledStatus from "../services/splitSkuByDisabledStatus.js";

var { getListGoodsFromDb } = dbUtils.goodsModelUtils;
var { getWeeklyPricesAndDiscounts } = dbUtils.weeklyPricesAndDiscountsModelUtils;

var getListGoodsAndWeeklyPrices = async (req, res, next) => {
  var { userId } = req.params;

  var { listGoods } = await getListGoodsFromDb(userId);

  var { listGoods } = splitSkuByDisabledStatus(listGoods);
  var { weeklyPricesAndDiscounts } = await getWeeklyPricesAndDiscounts(userId);

  return res.json({ listGoods, weeklyPricesAndDiscounts });
};

export default getListGoodsAndWeeklyPrices;
