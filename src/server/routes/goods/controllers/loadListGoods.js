import loadListGoodsService from "../services/loadListGoods.js";

var loadListGoodsController = async (req, res, next) => {
  var { listGoods, errorText } = await loadListGoodsService(req.body);

  return res.json({ listGoods, errorText });
};

export default loadListGoodsController;
