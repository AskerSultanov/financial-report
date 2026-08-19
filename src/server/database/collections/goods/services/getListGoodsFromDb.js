var getListGoodsFromDb = async (collection, userId, skuNames, selectedFields = [], session) => {
  var sessionOption = session ? { session } : {};

  if (Array.isArray(skuNames) && skuNames.length) {
    if (Array.isArray(selectedFields) && selectedFields?.length) {
      var projectFields = {};
      selectedFields.map((field) => {
        var key = field.split(".")[1];
        projectFields[key] = "$$r." + key;
      });

      var data = await collection.aggregate(
        [
          { $match: { userId, "listGoods.skuName": { $in: skuNames } } },
          {
            $project: {
              userId: 1,
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

      return { listGoods: data[0]?.listGoods ? data[0].listGoods : [] };
    }

    var data = await collection.aggregate(
      [
        { $match: { userId, "listGoods.skuName": { $in: skuNames } } },
        {
          $project: {
            userId: 1,
            listGoods: {
              $filter: {
                input: "$listGoods",
                cond: { $in: ["$$this.skuName", skuNames] },
              },
            },
          },
        },
      ],
      { ...sessionOption },
    );

    return { listGoods: data[0]?.listGoods ? data[0].listGoods : [] };
  } else {
    var data = await collection.findOne({ userId }, null, { ...sessionOption });
    
    return { listGoods: data?.listGoods ? data.listGoods.toObject() : [] };
  }
};

export default getListGoodsFromDb;
