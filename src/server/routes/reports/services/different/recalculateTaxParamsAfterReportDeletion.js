import truncateNum from "../reportParsing/truncateNum.js";

var recalculateTaxParamsAfterReportDeletion = (taxParams, skus) => {
  var recalculatedTaxParams = {};

  for (var sku of skus) {
    if (sku.year === taxParams.year) {
      var recalculatedFinalProfit = taxParams.finalProfit - sku.finalProfit;
      recalculatedTaxParams.finalProfit = truncateNum(recalculatedFinalProfit);

      var recalculatedTaxAmount = taxParams.paidTaxAmount - sku.tax;
      recalculatedTaxParams.paidTaxAmount = truncateNum(recalculatedTaxAmount);

      var recalculatedRetailAmount = taxParams.retailAmount - sku.retailAmount;
      recalculatedTaxParams.retailAmount = truncateNum(recalculatedRetailAmount);

      var recalculatedTaxableAmount = taxParams.taxableAmount - sku.taxableAmount;
      recalculatedTaxParams.taxableAmount = truncateNum(recalculatedTaxableAmount);

      var recalculatedInsuranceFee = taxParams.paidInsuranceFee - sku.insuranceFee;
      recalculatedTaxParams.paidInsuranceFee = truncateNum(recalculatedInsuranceFee);

      var recalculatedOtherExpenses = taxParams.otherExpenses - sku.otherExpenses;
      recalculatedTaxParams.otherExpenses = truncateNum(recalculatedOtherExpenses);

      if (recalculatedTaxParams.paidInsuranceFee < taxParams.mandarotyInsuranceFee) {
        recalculatedTaxParams.mandatoryInsuranceFeeRate = 10;
        recalculatedTaxParams.mandatoryInsuranceFeeIsPaid = false;
      }

      var recalculatedAdditionalInsuranceFee = taxParams.additionalInsuranceFee - sku.additionalInsuranceFee;
      recalculatedTaxParams.additionalInsuranceFee = truncateNum(recalculatedAdditionalInsuranceFee);

      var totalInsuranceFee = recalculatedTaxParams.paidInsuranceFee + recalculatedTaxParams.additionalInsuranceFee;

      if (totalInsuranceFee < taxParams.maxInsuranceFee) {
        recalculatedTaxParams.excessInsuranceRate = 1;
        recalculatedTaxParams.insuranceFeeIsPaid = false;
        recalculatedTaxParams.mandatoryInsuranceFeeRate = 10;
        recalculatedTaxParams.mandatoryInsuranceFeeIsPaid = false;
        recalculatedTaxParams.additionalInsuranceFeeIsPaid = false;
        recalculatedTaxParams.requiresAdditionalInsuranceFee = true;
      }
    }
  }

  return { recalculatedTaxParams };
};

export default recalculateTaxParamsAfterReportDeletion;
