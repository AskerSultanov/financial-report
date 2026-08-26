import { taxParamModel } from "../../../models/index.js";

var updateTaxParamsToDb = async (userId, updatedTaxParams, session) => {
  var count = 0;
  var query = {};
  var arrayFilters = [];

  for (var { year, data } of updatedTaxParams) {
    var arrayFiltersKey = `elem${count}.year`;
    var arrayFiltersValue = year;
    arrayFilters.push({ [arrayFiltersKey]: arrayFiltersValue });

    for (var key in data) {
      query[`years.$[elem${count}].${key}`] = data[key];
    }

    count++;
  }

  var result = await taxParamModel.updateOne({ userId }, { $set: query }, { arrayFilters, session: session });

  return result.acknowledged;
};

export default updateTaxParamsToDb;
