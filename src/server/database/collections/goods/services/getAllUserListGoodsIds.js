var getAllUserListGoodsIds = async (collection) => {
  var data = await collection.find({}, { _id: 0, userId: 1, "listGoods.id": 1, "listGoods.skuName": 1, "listGoods.disabled": 1 });

  return data.map(({ userId, listGoods }) => {
    return {
      userId,
      listGoodsIds: listGoods.map(({ id }) => id),
      listGoodsSkuNamesAndIds: listGoods.map(({ skuName, id }) => {
        return { skuName, id };
      }),
      listGoodsIdsAndDisableStatuses: listGoods,
    };
  });
};

export default getAllUserListGoodsIds;
