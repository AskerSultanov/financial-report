var createBulkQuery = (userId, updatedReports) => {
  var bulkOptions = [];

  for (var { reportId, updatedSkus } of updatedReports) {
    var query = {};
    var arrayFilters = [];

    if (Array.isArray(updatedSkus) && updatedSkus.length) {
      var count = 0;

      for (var updatedSku of updatedSkus) {
        var skuFilterName = `skuElem${count}`;
        arrayFilters.push({ [`${skuFilterName}.skuName`]: updatedSku.skuName });

        for (var skuKey of Object.keys(updatedSku.data)) {
          var queryKey = `reports.$.skus.$[${skuFilterName}].${skuKey}`;
          query[queryKey] = updatedSku.data[skuKey];
        }

        count++;
      }
    }
  }

  return { bulkOptions };
};

var saveUpdatedReports = async (collection, userId, updatedReports, session) => {
  var { bulkOptions } = createBulkQuery(userId, updatedReports);
  return await collection.bulkWrite(bulkOptions, { session });
};

export default saveUpdatedReports;
