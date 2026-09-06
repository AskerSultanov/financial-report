var createQuery = (skuName, data) => {
  var query = {};
  var arrayFilters = [];

  for (var key of Object.keys(data)) {
    query[`listGoods.$[sku].${key}`] = data[key];
  }

  var arrayFilterObj = { [`sku.skuName`]: skuName };
  arrayFilters.push(arrayFilterObj);

  return { query, arrayFilters };
};

var updateSkuInListGoods = async (collection, userId, skuId, skuName, data, session) => {
  var { query, arrayFilters } = createQuery(skuName, data);
  var result = await collection.updateOne({ userId }, { $set: query }, { arrayFilters, session: session });
  return result;
};

export default updateSkuInListGoods;
