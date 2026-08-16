import dbUtils from "../../../database/collections/index.js";
import generageSKusMetricsFile from "../services/skusMetrics/index.js";

var { getListGoodsFromDb } = dbUtils.goodsCollectionServices;

var getSkusMetricsFile = async (req, res, next) => {
  var { userId } = req.params;

  var { listGoods } = await getListGoodsFromDb(userId);
  var { skusMetricsFileBuffer } = await generageSKusMetricsFile(listGoods);

  res.set({
    "Content-Disposition": 'attachment; filename="file.xlsx"',
    "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  res.send(skusMetricsFileBuffer);
};

export default getSkusMetricsFile;
