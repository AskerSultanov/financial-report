var updateReportFromLocalStorage = (year, skuName, reportId, updatedSku) => {
  var reportInJSON = localStorage.getItem(reportId);
  var report = JSON.parse(reportInJSON);

  var skuFromLocalStorage = report.skus.find(
    (item) => item.year === year && item.skuName === skuName,
  );

  if (skuFromLocalStorage) {
    for (var key in updatedSku) {
      skuFromLocalStorage[key] = updatedSku[key];
    }
  }

  localStorage.setItem(reportId, JSON.stringify(report));
};

export default updateReportFromLocalStorage;
