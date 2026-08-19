var calc = {};

var sku = {};
var total = {};

import finalProfit from "./utils/finalProfit.js";
import restSkuParams from "./utils/restSkuParams.js";
import skuProfitMargin from "./utils/profitMargin.js";
import insuranceFee from "./utils/insuranceFee.js";
import storageCostFromPaidStorageReport from "./utils/SKUStorageCostFromPaidStorageReport.js";

sku.finalProfit = finalProfit;
sku.restParams = restSkuParams;
sku.profitMargin = skuProfitMargin;
sku.insuranceFee = insuranceFee;
sku.storageCostFromPaidStorageReport = storageCostFromPaidStorageReport;

import totalSold from "./utils/totalSold.js";
import totalStorageCost from "./utils/totalStorageCost.js";
import totalProfitMargin from "./utils/totalProfitMargin.js";
import restReportTotalParams from "./utils/restReportTotalParam.js";

total.sold = totalSold;
total.restParams = restReportTotalParams;
total.storageCost = totalStorageCost;
total.profitMargin = totalProfitMargin;

calc.sku = sku;
calc.total = total;

import sum from "./utils/sum.js";
import profit from "./utils/profit.js";
import quantity from "./utils/quantity.js";
import taxAmount from "./utils/taxAmount.js";
import storageCost from "./utils/storageCost.js";
import profitMargin from "./utils/profitMargin.js";
import preTaxProfit from "./utils/preTaxProfit.js";
import averageProfit from "./utils/averageProfit.js";
import sellerPayoutAmount from "./utils/sellerPayoutAmount.js";
import averageRetailPrice from "./utils/averageRetailPrice.js";
import averageStorageCost from "./utils/averageStorageCost.js";
import averageAdvertisingCost from "./utils/averageAdvertisingCost.js";
import retailAmount from "./utils/retailAmount.js";
import returnAmount from "./utils/returnAmount.js";
import taxableAmountOfReport from "./utils/taxableAmountOfReport.js";

calc.sum = sum;
calc.profit = profit;
calc.quantity = quantity;
calc.taxAmount = taxAmount;
calc.finalProfit = finalProfit;
calc.storageCost = storageCost;
calc.profitMargin = profitMargin;
calc.preTaxProfit = preTaxProfit;
calc.insuranceFee = insuranceFee;
calc.averageProfit = averageProfit;
calc.averageRetailPrice = averageRetailPrice;
calc.averageStorageCost = averageStorageCost;
calc.averageAdvertisingCost = averageAdvertisingCost;
calc.sellerPayoutAmount = sellerPayoutAmount;
calc.retailAmount = retailAmount;
calc.returnAmount = returnAmount;
calc.taxableAmount = taxableAmountOfReport;

export default calc;
