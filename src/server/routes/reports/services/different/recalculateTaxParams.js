import truncateNum from "../reportParsing/truncateNum.js";

var recalculateTaxParams = (updatedTaxParamsFieldsBySku, prevSkuData, newSkuData) => {
  var updatedTaxParamsField = { ...updatedTaxParamsFieldsBySku };

  var recalculatedFinalProfit = updatedTaxParamsField.finalProfit - prevSkuData.finalProfit + newSkuData.finalProfit;
  var recalculatedOtherExpenses = updatedTaxParamsField.otherExpenses - prevSkuData.otherExpenses + newSkuData.otherExpenses;

  updatedTaxParamsField.finalProfit = truncateNum(recalculatedFinalProfit);
  updatedTaxParamsField.otherExpenses = truncateNum(recalculatedOtherExpenses);

  return { updatedTaxParamsField };
};

export default recalculateTaxParams;
