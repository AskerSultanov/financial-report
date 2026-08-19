var createQuery = (updatedSkus) => {
  var query = {};
  var arrayFilters = [];

  var count = 0;

  for (var updatedSku of updatedSkus) {
    for (var key in updatedSku) {
      var queryKey = `listGoods.$[sku${count}].${key}`;
      query[queryKey] = updatedSku[key];
    }

    var arrayFiltersKey = `sku${count}.skuName`;
    arrayFilters.push({ [arrayFiltersKey]: updatedSku.skuName });

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
