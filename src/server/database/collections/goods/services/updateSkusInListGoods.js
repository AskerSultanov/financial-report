var createQuery = (updatedSkus) => {
  var query = {};
  var arrayFilters = [];

  var count = 0;

  for (var updatedSku of updatedSkus) {
    var { skuName, data } = updatedSku;

    for (var key in data) {
      var queryKey = `listGoods.$[sku${count}].${key}`;
      query[queryKey] = data[key];
    }

    var arrayFiltersKey = `sku${count}.skuName`;
    arrayFilters.push({ [arrayFiltersKey]: skuName });

    count++;
  }

  return { query, arrayFilters };
};

var updateSkusInListGoods = async (collection, userId, updatedSkus, session) => {
  var sessionOpt = session ? { session: session } : {};

  var { query, arrayFilters } = createQuery(updatedSkus);

  if (arrayFilters.length) {
    await collection.updateOne({ userId }, { $set: query }, { arrayFilters, ...sessionOpt });
  }
};

export default updateSkusInListGoods;
