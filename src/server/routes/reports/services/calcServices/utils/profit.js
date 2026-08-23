import truncateNum from "../../reportParsing/truncateNum.js";

var calcProfit = (sku) => {
  var profit =
    sku.sellerPayoutAmount - sku.fines - sku.acceptance - sku.storageCost - sku.deliveryCost - sku.additionalPayment - sku.averageAdvertisingCost;

  return truncateNum(profit);
};

export default calcProfit;
