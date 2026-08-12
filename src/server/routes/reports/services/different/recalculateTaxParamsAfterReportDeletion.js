import truncateNum from "../reportParsing/truncateNum.js";

var recalculateTaxParamsAfterReportDeletion = (taxParams, report, postfix = "") => {
  if (report["totalFinalProfit" + postfix]) {
    var recalculatedFinalProfit = taxParams.finalProfit - report["totalFinalProfit" + postfix];
    taxParams.finalProfit = truncateNum(recalculatedFinalProfit);

    var recalculatedInsuranceFee = taxParams.paidInsuranceFee - report["totalInsuranceFee" + postfix];
    taxParams.paidInsuranceFee = truncateNum(recalculatedInsuranceFee);
  }

  var recalculatedTaxAmount = taxParams.paidTaxAmount - report["totalTaxAmount" + postfix];
  taxParams.paidTaxAmount = truncateNum(recalculatedTaxAmount);

  var recalculatedRetailAmount = taxParams.retailAmount - report["totalRetailAmount" + postfix];
  taxParams.retailAmount = truncateNum(recalculatedRetailAmount);

  var recalculatedTaxableAmount = taxParams.taxableAmount - report["totalTaxableAmount" + postfix];
  taxParams.taxableAmount = truncateNum(recalculatedTaxableAmount);

  var recalculatedAdditionalInsuranceFee = taxParams.additionalInsuranceFee - report["totalAdditionalInsuranceFee" + postfix];
  taxParams.additionalInsuranceFee = truncateNum(recalculatedAdditionalInsuranceFee);

  var recalculatedOtherExpenses = taxParams.otherExpenses - report["totalOtherExpenses" + postfix];
  taxParams.otherExpenses = truncateNum(recalculatedOtherExpenses);

  return { updatedTaxParams: taxParams };
};

export default recalculateTaxParamsAfterReportDeletion;
