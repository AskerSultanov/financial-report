var createQuery = (updatedSkus) => {
  var query = {};
  var arrayFilters = [];

  if (Array.isArray(updatedSkus) && updatedSkus?.length) {
    var count = 0;

    for (var updatedSku of updatedSkus) {
      arrayFilters.push({ [`skuElem${count}.skuName`]: updatedSku.skuName });

      for (var skuKey of Object.keys(updatedSku.data)) {
        var queryKey = `reports.$.skus.$[skuElem${count}].${skuKey}`;
        query[queryKey] = updatedSku.data[skuKey];
      }

      count++;
    }
  }

  return { query, arrayFilters };
};

var saveUpdatedReport = async (reportModel, userId, reportId, updatedSkus, session) => {
  var { query, arrayFilters } = createQuery(updatedSkus);
  return await reportModel.updateOne({ userId, "reports.reportId": reportId }, { $set: query }, { arrayFilters, session: session });
};

export default saveUpdatedReport;
