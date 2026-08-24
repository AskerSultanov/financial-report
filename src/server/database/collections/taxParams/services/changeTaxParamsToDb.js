var changeTaxParamsToDb = async (taxParamModel, userId, session, ...updatedTaxParams) => {
  var count = 0;
  var query = {};
  var arrayFilters = [];

  for (var taxParams of updatedTaxParams) {
    var arrayFiltersKey = `elem${count}.year`;
    var arrayFiltersValue = taxParams.year;
    arrayFilters.push({ [arrayFiltersKey]: arrayFiltersValue });

    for (var key of Object.keys(taxParams)) {
      query[`years.$[elem${count}].${key}`] = taxParams[key];
    }

    count++;
  }

  var result = await taxParamModel.updateOne({ userId }, { $set: query }, { arrayFilters, session: session });

  return result.acknowledged;
};

export default changeTaxParamsToDb;
