import calc from "../calcServices/index.js";

var parseSku = async (name, skuQty, skuFilteredReport, storageData, taxRate, totals) => {
  var { totalSold, totalStorageCost, totalAdvertisingCosts } = totals;

  if (!skuFilteredReport.length) {
    return {};
  }

  var id = skuFilteredReport[0].nmId;
  var sku = initSku(id, name);

  var saleYear = +skuFilteredReport[0].saleDt.split("-")[0];
  sku.year = saleYear;

  sku.qty = calc.quantity(skuFilteredReport);
  sku.taxableAmount = calc.taxableAmount(skuFilteredReport);
  sku.fines = calc.sum(skuFilteredReport, "penalty", "truncate-on");
  sku.acceptance = calc.sum(skuFilteredReport, "paidAcceptance", "truncate-on");
  sku.retailAmount = calc.retailAmount(skuFilteredReport);
  sku.tax = calc.taxAmount(sku.taxableAmount, taxRate);
  sku.returnAmount = calc.returnAmount(skuFilteredReport);
  sku.deliveryCost = calc.sum(skuFilteredReport, "deliveryService", "truncate-on");
  sku.deductionOrPayment = calc.sum(skuFilteredReport, "deduction", "truncate-on");
  sku.additionalPayment = calc.sum(skuFilteredReport, "additionalPayment", "truncate-on");
  sku.sellerPayoutAmount = calc.sellerPayoutAmount(skuFilteredReport);
  sku.averageRetailPrice = calc.averageRetailPrice(sku.qty, skuFilteredReport);
  sku.storageCost = calc.storageCost(name, storageData);
  sku.averageStorageCost = calc.averageStorageCost(totalStorageCost, totalSold, sku.qty);
  sku.averageAdvertisingCost = calc.averageAdvertisingCost(skuQty, totalAdvertisingCosts);
  sku.profit = calc.profit(sku);

  return sku;
};

export default parseSku;

var initSku = function (id, name) {
  var sku = {};

  sku.id = id;
  sku.skuName = name;

  sku.qty = 0;
  sku.tax = 0;
  sku.fines = 0;
  sku.profit = 0;
  sku.costPrice = 0;
  sku.acceptance = 0;
  sku.storageCost = 0;
  sku.finalProfit = 0;
  sku.insuranceFee = 0;
  sku.returnAmount = 0;
  sku.profitMargin = 0;
  sku.deliveryCost = 0;
  sku.retailAmount = 0;
  sku.taxableAmount = 0;
  sku.averageProfit = 0;
  sku.otherExpenses = 0;
  sku.preTaxProfit = 0;
  sku.isCostPriceSet = false;
  sku.additionalPayment = 0;
  sku.deductionOrPayment = 0;
  sku.averageRetailPrice = 0;
  sku.sellerPayoutAmount = 0;
  sku.averageStorageCost = 0;
  sku.averageAdvertisingCost = 0;
  sku.additionalInsuranceFee = 0;
  sku.isInsuranceFeeIncluded = false;

  return sku;
};
