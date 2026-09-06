import dbUtils from "../../../database/modelsUtil/index.js";
import { generageWeeklyPricesFile } from "./utils/weeklyPrices/index.js";
import mergeListGoodsWithWeeklyPricesAndDiscounts from "./utils/mergeListGoodsWithWeeklyPricesAndDiscounts.js";

var { getListGoodsFromDb } = dbUtils.goodsModelUtils;
var { getWeeklyPricesAndDiscounts } =
  dbUtils.weeklyPricesAndDiscountsModelUtils;

var getWeeklyPricesFileService = async (userId) => {
  var { listGoods } = await getListGoodsFromDb(userId);
  var { weeklyPricesAndDiscounts } = await getWeeklyPricesAndDiscounts(userId);

  var { mergedData } = mergeListGoodsWithWeeklyPricesAndDiscounts(
    listGoods,
    weeklyPricesAndDiscounts,
  );
  var { buffer } = await generageWeeklyPricesFile(mergedData);

  return { buffer };
};

export default getWeeklyPricesFileService;
