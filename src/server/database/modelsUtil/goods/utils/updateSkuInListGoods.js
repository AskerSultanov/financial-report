import { goodsModel } from "../../../models/index.js";

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

var updateSkuInListGoods = async (userId, skuName, data, session) => {
  var sessionOptions = session ? { session } : {};
  var { query, arrayFilters } = createQuery(skuName, data);
  var result = await goodsModel.updateOne({ userId }, { $set: query }, { arrayFilters, ...sessionOptions });
  return result;
};

export default updateSkuInListGoods;
