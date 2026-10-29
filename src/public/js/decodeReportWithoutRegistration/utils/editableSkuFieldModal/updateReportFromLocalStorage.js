var updateReportFromLocalStorage = (year, skuName, updatedSku) => {
  var reportInJSON = localStorage.getItem("report");
  var report = JSON.parse(reportInJSON);

  var skuFromLocalStorage = report.skus.find(
    (item) => item.year === year && item.skuName === skuName,
  );

  if (skuFromLocalStorage) {
    for (var key in updatedSku) {
      skuFromLocalStorage[key] = updatedSku[key];
    }
  }

  localStorage.setItem('report', JSON.stringify(report));
};

export default updateReportFromLocalStorage;
