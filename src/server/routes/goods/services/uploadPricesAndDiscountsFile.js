import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import { readWeeklyPricesFile } from "./utils/weeklyPrices/index.js";

var { getListGoodsFromDb } = dbUtils.goodsModelUtils;
var { setWeeklyPricesAndDiscountsToDb } =
  dbUtils.weeklyPricesAndDiscountsModelUtils;

var uploadPricesAndDiscountsFileService = async (userId, fileBuffer) => {
  if (!userId) {
    return {
      userNotFound: true,
      listGoodsIsEmpty: false,
      weeklyPricesAndDiscounts: [],
    };
  }

  var session = await dbClient.startSession();

  return await session.withTransaction(async () => {
    var { listGoods } = await getListGoodsFromDb(userId, session);

    if (!listGoods.length) {
      return {
        listGoodsIsEmpty: true,
        userNotFound: false,
        weeklyPricesAndDiscounts: [],
      };
    }

    var { weeklyPricesAndDiscounts } = await readWeeklyPricesFile(
      fileBuffer,
      listGoods,
    );

    await setWeeklyPricesAndDiscountsToDb(
      userId,
      weeklyPricesAndDiscounts,
      session,
    );

    return {
      weeklyPricesAndDiscounts,
      userNotFound: false,
      listGoodsIsEmpty: false,
    };
  });
};

export default uploadPricesAndDiscountsFileService;
