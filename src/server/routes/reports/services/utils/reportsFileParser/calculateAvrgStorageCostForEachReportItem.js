import truncateNum from "../reportParsing/truncateNum.js";

var calculateAvrgStorageCostForEachReportItem = (totalStorageCost, skuNamesAndIds) => {
  var rowNums = skuNamesAndIds.map((sku) => sku.rowNums.length);
  var totalReportItems = rowNums.reduce((acc, item) => acc + +item, 0);
  var avrgStorageCostForEachItem = totalStorageCost / totalReportItems;
  avrgStorageCostForEachItem = truncateNum(avrgStorageCostForEachItem);
  return { avrgStorageCostForEachItem };
};

export default calculateAvrgStorageCostForEachReportItem;
