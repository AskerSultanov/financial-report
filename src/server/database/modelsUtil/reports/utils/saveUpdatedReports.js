import { reportModel } from "../../../models/index.js";

var createBulkQuery = (userId, updatedReports) => {
  var bulkOptions = [];

  for (var { reportId, updatedSkus } of updatedReports) {
    var query = {};
    var arrayFilters = [];

    if (Array.isArray(updatedSkus) && updatedSkus?.length) {
      var count = 0;

      for (var updatedSku of updatedSkus) {
        var { skuName, data } = updatedSku;

        var skuFilterName = `skuElem${count}`;
        arrayFilters.push({ [`${skuFilterName}.skuName`]: skuName });

        for (var skuKey in data) {
          var queryKey = `skus.$[${skuFilterName}].${skuKey}`;
          query[queryKey] = data[skuKey];
        }

        count++;
      }
    }

    if (arrayFilters.length) {
      bulkOptions.push({ updateOne: { filter: { userId, reportId }, update: { $set: query }, arrayFilters } });
    }
  }

  return { bulkOptions };
};

var saveUpdatedReports = async (userId, updatedReports, session) => {
  var { bulkOptions } = createBulkQuery(userId, updatedReports);

  if (bulkOptions.length) {
    return await reportModel.bulkWrite(bulkOptions, { session });
  }
};

export default saveUpdatedReports;
