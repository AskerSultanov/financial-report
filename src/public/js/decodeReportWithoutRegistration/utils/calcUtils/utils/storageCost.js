import truncateNum from "../../reportParsing/truncateNum.js";

var calcStorageCost = (skuName, storageData) => {
  var sku = storageData.find((e) => skuName === e.name);

  return truncateNum(sku?.skuStorageCost ?? 0);
};

export default calcStorageCost;
