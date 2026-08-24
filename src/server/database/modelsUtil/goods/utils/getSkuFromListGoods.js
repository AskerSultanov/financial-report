import { goodsModel } from "../../../models/index.js";

var getSkuFromListGoods = async (userId, skuId, skuName, session) => {
  var data = await goodsModel.findOne({ userId, "listGoods.id": skuId, "listGoods.skuName": skuName }, { "listGoods.$": 1 }, { session: session });

  return { skuFromListGoods: data?.listGoods[0] };
};

export default getSkuFromListGoods;
