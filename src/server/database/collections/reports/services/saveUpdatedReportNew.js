var createQuery = (reportId, updatedTotals, updatedSkus) => {
  var query = {};
  var arrayFilters = [];

  arrayFilters.push({ "elem.reportId": reportId });

  for (var totalKey of Object.keys(updatedTotals)) {
    var queryKey = `reports.$[elem].${totalKey}`;
    query[queryKey] = updatedTotals[totalKey];
  }

  if (Array.isArray(updatedSkus) && updatedSkus.length) {
    var count = 0;

    for (var updatedSku of updatedSkus) {
      arrayFilters.push({ [`skuElem${count}.skuName`]: updatedSku.skuName });

      for (var skuKey of Object.keys(updatedSku.data)) {
        var queryKey = `reports.$[elem].skus.$[skuElem${count}].${skuKey}`;
        query[queryKey] = updatedSku.data[skuKey];
      }

      count++;
    }
  }

  return { query, arrayFilters };
};

var saveUpdatedReport = async (collection, userId, reportId, updatedTotals, updatedSkus, session) => {
  var { query, arrayFilters } = createQuery(reportId, updatedTotals, updatedSkus);

  var result = await collection.updateOne({ userId, "reports.reportId": reportId }, { $set: query }, { arrayFilters, session: session });

  return result.acknowledged;
};

export default saveUpdatedReport;
