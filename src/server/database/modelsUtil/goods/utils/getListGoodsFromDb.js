import { goodsModel } from "../../../models/index.js";

var getListGoodsFromDb = async (userId, skuNames, selectedFields, session) => {
  var sessionOptions = session ? { session } : {};

  var data = await goodsModel.findOne({ userId }, null, { ...sessionOptions }).select(selectedFields);

  if (Array.isArray(skuNames) && skuNames.length) {
    var requiredSkusFromListGoods = [];

    for (var sku of data?.listGoods) {
      var requiredSku = skuNames.find((skuName) => skuName === sku.skuName);

      if (requiredSku) {
        requiredSkusFromListGoods.push(sku);
      }
    }

    return { listGoods: requiredSkusFromListGoods };
  }

  return { listGoods: data?.listGoods ? data.listGoods.toObject() : [] };
};

export default getListGoodsFromDb;
