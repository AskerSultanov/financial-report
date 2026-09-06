var calcSkuStorageCostFromPaidStorageReport = (report, skuName) => {
  var sku = report.filter((e) => e.vendorCode == skuName);

  var skuStorageCost = sku.reduce((acc, sku) => acc + sku.warehousePrice, 0);

  return { skuStorageCost };
};

export default calcSkuStorageCostFromPaidStorageReport;
