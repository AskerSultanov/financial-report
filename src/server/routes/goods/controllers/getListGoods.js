import dbUtils from "../../../database/collections/index.js";
var { getListGoodsFromDb } = dbUtils.goodsCollectionServices;

var getListGoods = async (req, res) => {
  var { userId } = req.params;

  var { listGoods } = await getListGoodsFromDb(userId);
  res.json({ listGoodsLength: listGoods.length, listGoods });
};

export default getListGoods;
