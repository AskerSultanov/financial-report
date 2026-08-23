import truncateNum from "../reportParsing/truncateNum.js";

var recalculateTaxParamsAfterReportDeletion = (taxParams, skus) => {
  var updatedTaxParams = {};

  for (var sku of skus) {
    if (sku.year === taxParams.year) {
      var recalculatedFinalProfit = taxParams.finalProfit - sku.finalProfit;
      updatedTaxParams.finalProfit = truncateNum(recalculatedFinalProfit);

      var recalculatedTaxAmount = taxParams.paidTaxAmount - sku.tax;
      updatedTaxParams.paidTaxAmount = truncateNum(recalculatedTaxAmount);

      var recalculatedRetailAmount = taxParams.retailAmount - sku.retailAmount;
      updatedTaxParams.retailAmount = truncateNum(recalculatedRetailAmount);

      var recalculatedTaxableAmount = taxParams.taxableAmount - sku.taxableAmount;
      updatedTaxParams.taxableAmount = truncateNum(recalculatedTaxableAmount);

      var recalculatedInsuranceFee = taxParams.paidInsuranceFee - sku.insuranceFee;
      updatedTaxParams.paidInsuranceFee = truncateNum(recalculatedInsuranceFee);

      var recalculatedOtherExpenses = taxParams.otherExpenses - sku.otherExpenses;
      updatedTaxParams.otherExpenses = truncateNum(recalculatedOtherExpenses);

      if (updatedTaxParams.paidInsuranceFee < taxParams.mandarotyInsuranceFee) {
        updatedTaxParams.mandatoryInsuranceFeeRate = 10;
        updatedTaxParams.mandatoryInsuranceFeeIsPaid = false;
      }

      var recalculatedAdditionalInsuranceFee = taxParams.additionalInsuranceFee - sku.additionalInsuranceFee;
      updatedTaxParams.additionalInsuranceFee = truncateNum(recalculatedAdditionalInsuranceFee);

      var totalInsuranceFee = updatedTaxParams.paidInsuranceFee + updatedTaxParams.additionalInsuranceFee;

      if (totalInsuranceFee < taxParams.maxInsuranceFee) {
        updatedTaxParams.excessInsuranceRate = 1;
        updatedTaxParams.insuranceFeeIsPaid = false;
        updatedTaxParams.mandatoryInsuranceFeeRate = 10;
        updatedTaxParams.mandatoryInsuranceFeeIsPaid = false;
        updatedTaxParams.additionalInsuranceFeeIsPaid = false;
        updatedTaxParams.requiresAdditionalInsuranceFee = true;
      }
    }
  }

  return { updatedTaxParams };
};

export default recalculateTaxParamsAfterReportDeletion;
