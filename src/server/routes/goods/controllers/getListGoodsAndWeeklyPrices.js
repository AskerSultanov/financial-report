import dbUtils from "../../../database/collections/index.js";
import splitSkuByDisabledStatus from "../services/splitSkuByDisabledStatus.js";

var { getListGoodsFromDb } = dbUtils.goodsCollectionServices;
var { getWeeklyPricesAndDiscountsFromDb } = dbUtils.weeklyPricesAndDiscountsCollectionServices;

var getListGoodsAndWeeklyPrices = async (req, res, next) => {
  var { userId } = req.params;

  var { listGoods } = await getListGoodsFromDb(userId);

  var { listGoods } = splitSkuByDisabledStatus(listGoods);
  var { weeklyPricesAndDiscounts } = await getWeeklyPricesAndDiscountsFromDb(userId);

  return res.json({ listGoods, weeklyPricesAndDiscounts });
};

export default getListGoodsAndWeeklyPrices;
