import { reportModel } from "../../../models/index.js";

var createQuery = (updatedSkus) => {
  var query = {};
  var arrayFilters = [];

  if (Array.isArray(updatedSkus) && updatedSkus?.length) {
    var count = 0;

    for (var { skuName, year, data } of updatedSkus) {
      arrayFilters.push({
        [`skuElem${count}.year`]: year,
        [`skuElem${count}.skuName`]: skuName,
      });

      for (var skuKey of Object.keys(data)) {
        var queryKey = `skus.$[skuElem${count}].${skuKey}`;
        query[queryKey] = data[skuKey];
      }

      count++;
    }
  }

  return { query, arrayFilters };
};

var saveUpdatedReport = async (userId, reportId, updatedSkus, session) => {
  var { query, arrayFilters } = createQuery(updatedSkus);
  return await reportModel.updateOne(
    { userId, reportId },
    { $set: query },
    { arrayFilters, session: session },
  );
};

export default saveUpdatedReport;
