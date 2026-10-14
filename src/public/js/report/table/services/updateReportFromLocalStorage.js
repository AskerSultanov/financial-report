var updateReportFromLocalStorage = ({ userId, sku }) => {
  var reportAsJSON = localStorage.getItem(userId);
  var report = JSON.parse(reportAsJSON);

  var skuFromLocalStorage = report.skus.find(
    (item) => item.year === sku.year && item.skuName === sku.skuName,
  );

  if (skuFromLocalStorage) {
    for (var key in sku.data) {
      skuFromLocalStorage[key] = sku.data[key];
    }
  }

  localStorage.setItem(userId, JSON.stringify(report));
};

export default updateReportFromLocalStorage;
