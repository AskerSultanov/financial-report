var bulkUpdatedReportFromLocalStorage = (reportId, updatedSkus) => {
  var reportInJSON = localStorage.getItem("report_" + reportId);
  var report = JSON.parse(reportInJSON);

  for (var { skuName, year, updatedSku } of updatedSkus) {
    var skuFromLocalStorage = report.skus.find(
      (item) => item.year === year && item.skuName === skuName,
    );

    if (skuFromLocalStorage) {
      for (var key in updatedSku) {
        skuFromLocalStorage[key] = updatedSku[key];
      }
    }
  }

  localStorage.setItem("report_" + reportId, JSON.stringify(report));
};

export default bulkUpdatedReportFromLocalStorage;
