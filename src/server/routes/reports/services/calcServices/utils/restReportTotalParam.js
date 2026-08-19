import sum from "./sum.js";
import calcProfitMargin from "./profitMargin.js";
import calcProductCosts from "./totalProductCosts.js";
import truncateNum from "../../reportParsing/truncateNum.js";

var currentYearPostfix = "InCurrentYear";
var endYearPostfix = "InNextYear";

var calcRestReportTotalParams = (totals, prevSkuData, newSkuData, isCrossYearPeriod, postfix = "") => {
  var qtyKey = "qty" + postfix;
  var costPriceKey = "costPrice" + postfix;
  var finalProfitKey = "finalProfit" + postfix;
  var preTaxProfitKey = "preTaxProfit" + postfix;
  var profitMarginKey = "profitMargin" + postfix;
  var retailAmountKey = "retailAmount" + postfix;
  var insuranceFeeKey = "insuranceFee" + postfix;
  var otherExpensesKey = "otherExpenses" + postfix;

  var totalFinalProfitKey = "totalFinalProfit" + postfix;
  var totalPreTaxProfitKey = "totalPreTaxProfit" + postfix;
  var totalProfitMarginKey = "totalProfitMargin" + postfix;
  var totalRetailAmountKey = "totalRetailAmount" + postfix;
  var totalInsuranceFeeKey = "totalInsuranceFee" + postfix;
  var totalProductCostsKey = "totalProductCosts" + postfix;
  var totalOtherExpensesKey = "totalOtherExpenses" + postfix;

  var updatedTotals = {};

  if (isCrossYearPeriod) {
    //preTaxProfit
    var recalculatedPreTaxProfit = totals[totalPreTaxProfitKey] - prevSkuData[preTaxProfitKey] + newSkuData[preTaxProfitKey];
    updatedTotals[totalPreTaxProfitKey] = truncateNum(recalculatedPreTaxProfit);
    totals[totalPreTaxProfitKey] = truncateNum(recalculatedPreTaxProfit);

    //finalProfit
    var recalculatedFinalProfit = totals[totalFinalProfitKey] - prevSkuData[finalProfitKey] + newSkuData[finalProfitKey];
    updatedTotals[totalFinalProfitKey] = truncateNum(recalculatedFinalProfit);
    totals[totalFinalProfitKey] = truncateNum(recalculatedFinalProfit);

    //productCosts
    var prevSkuProductCosts = prevSkuData[qtyKey] * prevSkuData[costPriceKey];
    var newSkuProductCosts = prevSkuData[qtyKey] * newSkuData[costPriceKey];

    var recalculatedProductCosts = totals[totalProductCostsKey] - prevSkuProductCosts + newSkuProductCosts;
    updatedTotals[totalProductCostsKey] = truncateNum(recalculatedProductCosts);
    totals[totalProductCostsKey] = truncateNum(recalculatedProductCosts);

    //insuranceFee
    var recalculatedInsuranceFee = totals[totalInsuranceFeeKey] - prevSkuData[insuranceFeeKey] + newSkuData[insuranceFeeKey];
    updatedTotals[totalInsuranceFeeKey] = truncateNum(recalculatedInsuranceFee);
    totals[totalInsuranceFeeKey] = truncateNum(recalculatedInsuranceFee);

    //otherExpenses
    var recalculatedOtherExpenses = totals[totalOtherExpensesKey] - prevSkuData[otherExpensesKey] + newSkuData[otherExpensesKey];
    updatedTotals[totalOtherExpensesKey] = truncateNum(recalculatedOtherExpenses);
    totals[totalOtherExpensesKey] = truncateNum(recalculatedOtherExpenses);

    //margin
    updatedTotals[totalProfitMarginKey] = calcProfitMargin(totals[totalFinalProfitKey], totals[totalRetailAmountKey]);

    //rest

    var recalculatedTotalPreTaxProfit = totals.totalPreTaxProfitInCurrentYear + totals.totalPreTaxProfitInNextYear;
    updatedTotals.totalPreTaxProfit = truncateNum(recalculatedTotalPreTaxProfit);

    var recalculatedTotalFinalProfit = totals.totalFinalProfitInCurrentYear + totals.totalFinalProfitInNextYear;
    updatedTotals.totalFinalProfit = truncateNum(recalculatedTotalFinalProfit);

    var recalculatedTotalProductCosts = totals.totalProductCostsInCurrentYear + totals.totalProductCostsInNextYear;
    updatedTotals.totalProductCosts = truncateNum(recalculatedTotalProductCosts);

    var recalculatedTotalInsuranceFee = totals.totalInsuranceFeeInCurrentYear + totals.totalInsuranceFeeInNextYear;
    updatedTotals.totalInsuranceFee = truncateNum(recalculatedTotalInsuranceFee);

    var recalculatedTotalOtherExpenses = totals.totalOtherExpensesInCurrentYear + totals.totalOtherExpensesInNextYear;
    updatedTotals.totalOtherExpenses = truncateNum(recalculatedTotalOtherExpenses);
  } else {
    //preTaxProfit
    var recalculatedTotalPreTaxProfit = totals.totalPreTaxProfit - prevSkuData.preTaxProfit + newSkuData.preTaxProfit;
    updatedTotals.totalPreTaxProfit = truncateNum(recalculatedTotalPreTaxProfit);

    //finalProfit
    var recalculatedTotalFinalProfit = totals.totalFinalProfit - prevSkuData.finalProfit + newSkuData.finalProfit;
    updatedTotals.totalFinalProfit = truncateNum(recalculatedTotalFinalProfit);

    //productCosts
    var prevSkuProductCosts = prevSkuData[qtyKey] * prevSkuData[costPriceKey];
    var newSkuProductCosts = prevSkuData[qtyKey] * newSkuData[costPriceKey];

    var recalculatedTotalProductCosts = totals.totalProductCosts - prevSkuProductCosts + newSkuProductCosts;
    updatedTotals.totalProductCosts = truncateNum(recalculatedTotalProductCosts);

    //insuranceFee
    var recalculatedTotalInsuranceFee = totals.totalInsuranceFee - prevSkuData.insuranceFee + newSkuData.insuranceFee;
    updatedTotals.totalInsuranceFee = truncateNum(recalculatedTotalInsuranceFee);

    //profitMargin
    var recalculatedTotalOtherExpenses = totals.totalOtherExpenses - prevSkuData.otherExpenses + newSkuData.otherExpenses;
    updatedTotals.totalOtherExpenses = truncateNum(recalculatedTotalOtherExpenses);
  }

  updatedTotals.totalProfitMargin = calcProfitMargin(updatedTotals.totalFinalProfit, totals.totalRetailAmount);

  return { updatedTotals };
};

export default calcRestReportTotalParams;
