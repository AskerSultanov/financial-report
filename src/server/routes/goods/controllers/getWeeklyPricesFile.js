import dbUtils from "../../../database/modelsUtil/index.js";
import { generageWeeklyPricesFile } from "../services/weeklyPrices/index.js";
import mergeListGoodsWithWeeklyPricesAndDiscounts from "../services/mergeListGoodsWithWeeklyPricesAndDiscounts.js";

var { getListGoodsFromDb } = dbUtils.goodsModelUtils;
var { getWeeklyPricesAndDiscountsFromDb } = dbUtils.weeklyPricesAndDiscountsModelUtils;

var getWeeklyPricesFileController = async (req, res, next) => {
  var { userId } = req.params;

  var { listGoods } = await getListGoodsFromDb(userId);
  var { weeklyPricesAndDiscounts } = await getWeeklyPricesAndDiscountsFromDb(userId);

  var { mergedData } = mergeListGoodsWithWeeklyPricesAndDiscounts(listGoods, weeklyPricesAndDiscounts);
  var { buffer } = await generageWeeklyPricesFile(mergedData);

  res.set({
    "Content-Disposition": 'attachment; filename="weeklyPrices.xlsx"',
    "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  return res.send(buffer);
};

export default getWeeklyPricesFileController;
