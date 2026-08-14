var projectQueries = ["listGoods.id", "listGoods.skuName", "listGoods.metrics"];

var getListGoodsFromDb = async (collection, userId, skuNames, session) => {
  var sessionOption = session ? { session } : {};

  if (Array.isArray(skuNames) && skuNames.length) {
    var projectFields = {};

    projectQueries.map((field) => {
      var key = field.split(".")[1];
      projectFields[key] = "$$r." + key;
    });

    var data = await collection.aggregate(
      [
        { $match: { userId, "listGoods.skuName": { $in: skuNames } } },
        {
          $project: {
            listGoods: {
              $map: {
                input: {
                  $filter: {
                    input: "$listGoods",
                    cond: { $in: ["$$this.skuName", skuNames] },
                  },
                },
                as: "r",
                in: projectFields,
              },
            },
          },
        },
      ],
      { ...sessionOption },
    );

    return { listGoods: data?.listGoods ? data[0].listGoods : [] };
  } else {
    var data = await collection.findOne({ userId }, null, { ...sessionOption });

    return { listGoods: data?.listGoods ? data.listGoods.toObject() : [] };
  }
};

export default getListGoodsFromDb;
