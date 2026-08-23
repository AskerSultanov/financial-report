var calcSkuStorageCostFromPaidStorageReport = (report, skuName) => {
  var sku = report.filter((e) => e.vendorCode == skuName);

  var SKUStorageCost = sku.reduce((acc, sku) => acc + sku.warehousePrice, 0);

  return SKUStorageCost;
};

export default calcSkuStorageCostFromPaidStorageReport;
