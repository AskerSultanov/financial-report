import truncateNum from "../reportParsing/truncateNum.js";

var recalculateTaxParams = (updatedTaxParamsFieldsBySku, prevReportTotals, currentReportTotals, postfix = "") => {
  var finalProfitKey = "totalFinalProfit" + postfix;
  var otherExpensesKey = "totalOtherExpenses" + postfix;

  var updatedTaxParamsField = { ...updatedTaxParamsFieldsBySku };

  var recalculatedFinalProfit = updatedTaxParamsField.finalProfit - prevReportTotals[finalProfitKey] + currentReportTotals[finalProfitKey];
  var recalculatedOtherExpenses = updatedTaxParamsField.otherExpenses - prevReportTotals[otherExpensesKey] + currentReportTotals[otherExpensesKey];

  updatedTaxParamsField.finalProfit = truncateNum(recalculatedFinalProfit);
  updatedTaxParamsField.otherExpenses = truncateNum(recalculatedOtherExpenses);

  return { updatedTaxParamsField };
};

export default recalculateTaxParams;
