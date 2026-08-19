var getListGoodsFromDb = async (collection, userId, skuNames, session) => {
  var sessionOption = session ? { session } : {};

  if (Array.isArray(skuNames) && skuNames.length) {
    var data = await collection.aggregate([
      { $match: { userId, "listGoods.skuName": { $in: skuNames } } },
      {
        $project: {
          userId: 1,
          listGoods: {
            $filter: {
              input: "$listGoods",
              as: "item",
              cond: { $in: ["$$item.skuName", skuNames] },
            },
          },
        },
      },
    ]);

    return { listGoods: data[0]?.listGoods ? data[0].listGoods : [] };
  } else {
    var data = await collection.findOne({ userId }, null, { ...sessionOption });

    return { listGoods: data?.listGoods ? data.listGoods.toObject() : [] };
  }
};

export default getListGoodsFromDb;
