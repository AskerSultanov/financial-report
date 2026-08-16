var createQuery = (reports) => {
  var query = {};
  var arrayFilters = [];

  for (var report of reports) {
    var { reportId } = report;
    var key = `reports.$[report${reportId}]`;
    query[key] = report;

    arrayFilters.push({ [`report${reportId}.reportId`]: reportId });
  }

  return { query, arrayFilters };
};

var saveUpdatedReports = async (collection, userId, reports, session) => {
  var { query, arrayFilters } = createQuery(reports);

  var result = await collection.updateOne({ userId }, { $set: query }, { arrayFilters, session: session });

  return result.modifiedCount;
};

export default saveUpdatedReports;
