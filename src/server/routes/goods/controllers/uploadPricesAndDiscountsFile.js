import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import { readWeeklyPricesFile } from "../services/weeklyPrices/index.js";

var { getListGoodsFromDb } = dbUtils.goodsModelUtils;
var { setWeeklyPricesAndDiscountsToDb } = dbUtils.weeklyPricesAndDiscountsModelUtils;

var uploadPricesAndDiscountsFileController = async (req, res, next) => {
  var userId = req.body.userId;

  if (!userId) {
    return res.sendStatus(400);
  }

  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      var { listGoods } = await getListGoodsFromDb(userId, session);

      if (!listGoods.length) {
        return res.sendStatus(400);
      }
      var fileBuffer = req.file.buffer;

      var { weeklyPricesAndDiscounts } = await readWeeklyPricesFile(fileBuffer, listGoods);
      await setWeeklyPricesAndDiscountsToDb(userId, weeklyPricesAndDiscounts, session);

      return res.json({ weeklyPricesAndDiscounts });
    });
  } catch (e) {
    throw e;
  } finally {
    await session.endSession();
  }
};

export default uploadPricesAndDiscountsFileController;
