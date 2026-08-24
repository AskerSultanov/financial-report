import { goodsModel } from "../../../models/index.js";

var mskTimeOffsetInMs = 10_800_000;

var getLastModifiedDate = () => Date.now() + mskTimeOffsetInMs;

var createQuery = (priceData) => {
  var query = {};
  var arrayFilters = [];

  var count = 0;
  for (var { nmID, status, errorText } of priceData) {
    var isPriceUpdated = status === 2;

    /**
     * 2 - the product is error-free, and the price and/or discount have been updated
     * https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1history~1goods~1task/get
     */

    var priceStatusKey = `listGoods.$[elem${count}].isPriceUpdated`;
    query[priceStatusKey] = isPriceUpdated;

    var lastUpdated = getLastModifiedDate();
    var lastUpdatedKey = `listGoods.$[elem${count}].lastUpdated`;
    query[lastUpdatedKey] = lastUpdated;

    var errorTextKey = `listGoods.$[elem${count}].errorText`;
    query[errorTextKey] = errorText;

    var optionKey = `elem${count}.id`;
    arrayFilters.push({ [optionKey]: nmID });

    count++;
  }
  return { query, arrayFilters };
};

var setPriceUpdateTimestampAndUpdateStatus = async (userId, priceData, session) => {
  var sessionOpt = session ? { session: session } : {};
  var { query, arrayFilters } = createQuery(priceData);
  var result = await goodsModel.updateOne({ userId }, { $set: query }, { arrayFilters, ...sessionOpt });
  return result;
};

export default setPriceUpdateTimestampAndUpdateStatus;
