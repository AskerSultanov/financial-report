import dbUtils from "../../../database/modelsUtil/index.js";
var { getListGoodsFromDb } = dbUtils.goodsModelUtils;

var getListGoodsController = async (req, res) => {
  var { userId } = req.params;

  var { listGoods } = await getListGoodsFromDb(userId);
  res.json({ listGoodsLength: listGoods.length, listGoods });
};

export default getListGoodsController;
