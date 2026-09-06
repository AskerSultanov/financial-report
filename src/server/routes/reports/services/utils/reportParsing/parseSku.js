import calc from "../calcServices/index.js";

var costPrice = 0;
var otherExpenses = 0;
var insuranceFee = 0;
var preTaxProfit = 0;
var finalProfit = 0;
var profitMargin = 0;
var averageProfit = 0;
var isCostPriceSet = false;
var additionalInsuranceFee = 0;
var isInsuranceFeeIncluded = false;

var parseSku = async (skuName, skuQty, skuFilteredReport, storageCost, taxRate, totals) => {
  var { totalSold, totalStorageCost, totalAdvertisingCosts } = totals;

  if (!skuFilteredReport.length) {
    return null;
  }

  var id = skuFilteredReport[0].nmId;

  var year = +skuFilteredReport[0].saleDt.split("-")[0];

  var qty = calc.quantity(skuFilteredReport);

  var taxableAmount = calc.taxableAmount(skuFilteredReport);

  var fines = calc.sum(skuFilteredReport, "penalty", "truncate-on");

  var acceptance = calc.sum(skuFilteredReport, "paidAcceptance", "truncate-on");

  var retailAmount = calc.retailAmount(skuFilteredReport);

  var tax = calc.taxAmount(taxableAmount, taxRate);

  var returnAmount = calc.returnAmount(skuFilteredReport);

  var deliveryCost = calc.sum(skuFilteredReport, "deliveryService", "truncate-on");

  var deductionOrPayment = calc.sum(skuFilteredReport, "deduction", "truncate-on");

  var additionalPayment = calc.sum(skuFilteredReport, "additionalPayment", "truncate-on");

  var sellerPayoutAmount = calc.sellerPayoutAmount(skuFilteredReport);

  var averageStorageCost = calc.averageStorageCost(totalStorageCost, totalSold, qty);

  var averageAdvertisingCost = calc.averageAdvertisingCost(skuQty, totalAdvertisingCosts);

  var profit = sellerPayoutAmount - fines - acceptance - additionalPayment - averageAdvertisingCost - storageCost - deliveryCost;

  var sku = {
    id,
    skuName,
    qty,
    tax,
    year,
    fines,
    costPrice,
    retailAmount,
    returnAmount,
    taxableAmount,
    deductionOrPayment,
    averageStorageCost,
    profit,
    insuranceFee,
    acceptance,
    additionalPayment,
    storageCost,
    deliveryCost,
    otherExpenses,
    isCostPriceSet,
    averageAdvertisingCost,
    sellerPayoutAmount,
    additionalInsuranceFee,
    isInsuranceFeeIncluded,
    preTaxProfit,
    finalProfit,
    profitMargin,
    averageProfit,
  };

  return sku;
};

export default parseSku;
