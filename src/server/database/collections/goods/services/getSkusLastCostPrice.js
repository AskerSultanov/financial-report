var getSkusLastCostPrice = async (goodsModel, userId) => {
  var data = await goodsModel.findOne({ userId }, { "listGoods.lastCostPrice": 1, "listGoods.id": 1, "listGoods.skuName": 1, _id: 0 });

  return { skusLastCostPrice: data.listGoods };
};

export default getSkusLastCostPrice;
