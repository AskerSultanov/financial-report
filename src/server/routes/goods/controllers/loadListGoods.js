import { dbClient } from "../../../database/index.js";
import listGoodsLoader from "../services/listGoodsLoader.js";
import dbUtils from "../../../database/collections/index.js";
import removeDublicates from "../services/removeDublicates.js";
import updateListGoodsMetrics from "../../reports/services/different/updateListGoodsMetrics.js";

var skuNames = null;
var updateWBTokenLastUsedTimestampNow = true;
var projectedFields = ["reports.skus", "reports.recordedTo", "reports.isCrossYearPeriod"];

var { getReportsByUserId } = dbUtils.reportCollectionServices;
var { saveListGoodsToDb, getListGoodsFromDb } = dbUtils.goodsCollectionServices;
var { getWBTokenByUserId, updateWBTokenLastUsedTimestamp } = dbUtils.tokenCollectionServices;

var loadListGoods = async (req, res, next) => {
  var { userId } = req.body;

  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      var { token } = await getWBTokenByUserId(userId, session, updateWBTokenLastUsedTimestampNow);

      if (!token) {
        return res.status(400).json({ msg: "В первую очередь нужно загрузить токен личного кабинета WB" });
      } else {
        var { listGoods } = await getListGoodsFromDb(userId, skuNames, session);

        var { reports } = await getReportsByUserId(userId, session, projectedFields);

        var { listGoodsFromWBAPI } = await listGoodsLoader(userId, token);

        var { dedublicatedListGoods } = removeDublicates(listGoods, listGoodsFromWBAPI);

        for (var report of reports) {
          dedublicatedListGoods = await updateListGoodsMetrics(report, dedublicatedListGoods).listGoodsWithUpdatedSkuMetrics;
        }

        await saveListGoodsToDb(userId, dedublicatedListGoods, session);

        return res.json({ listGoods: dedublicatedListGoods });
      }
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(304);
  } finally {
    if (session) {
      await session.endSession();
    }
  }
};

export default loadListGoods;
