import truncateNum from "../../reportParsing/truncateNum.js";

var calcTotalStorageCost = (report) => {
  var totalStorageCost = report.reduce((acc, sku) => acc + +sku.paidStorage, 0);
  return truncateNum(totalStorageCost);
};

export default calcTotalStorageCost;
