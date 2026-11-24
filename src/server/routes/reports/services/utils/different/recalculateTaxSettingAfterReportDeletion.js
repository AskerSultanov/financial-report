import truncateNum from "../reportParsing/truncateNum.js";

var recalculateTaxSettingAfterReportDeletion = (taxSetting, skus) => {
  var recalculatedTaxSetting = {};

  for (var sku of skus) {
    if (sku.year === taxSetting.year) {
      var recalculatedFinalProfit = taxSetting.finalProfit - sku.finalProfit;
      recalculatedTaxSetting.finalProfit = truncateNum(recalculatedFinalProfit);

      //var recalculatedTaxAmount = taxSetting.paidTaxAmount - sku.tax;
      //recalculatedTaxSetting.paidTaxAmount = truncateNum(recalculatedTaxAmount);

      var recalculatedRetailAmount = taxSetting.retailAmount - sku.retailAmount;
      recalculatedTaxSetting.retailAmount = truncateNum(
        recalculatedRetailAmount,
      );

      var recalculatedTaxableAmount =
        taxSetting.taxableAmount - sku.taxableAmount;
      recalculatedTaxSetting.taxableAmount = truncateNum(
        recalculatedTaxableAmount,
      );

      //var recalculatedInsuranceFee = taxSetting.paidInsuranceFee - sku.insuranceFee;
      //recalculatedTaxSetting.paidInsuranceFee = truncateNum(recalculatedInsuranceFee);

      var recalculatedOtherExpenses =
        taxSetting.otherExpenses - sku.otherExpenses;
      recalculatedTaxSetting.otherExpenses = truncateNum(
        recalculatedOtherExpenses,
      );

      // if (recalculatedTaxSetting.paidInsuranceFee < taxSetting.mandarotyInsuranceFee) {
      //   recalculatedTaxSetting.mandatoryInsuranceFeeRate = 10;
      //   recalculatedTaxSetting.mandatoryInsuranceFeeIsPaid = false;
      // }

      // var recalculatedAdditionalInsuranceFee = taxSetting.additionalInsuranceFee - sku.additionalInsuranceFee;
      // recalculatedTaxSetting.additionalInsuranceFee = truncateNum(recalculatedAdditionalInsuranceFee);

      // var totalInsuranceFee = recalculatedTaxSetting.paidInsuranceFee + recalculatedTaxSetting.additionalInsuranceFee;

      // if (totalInsuranceFee < taxSetting.maxInsuranceFee) {
      //   recalculatedTaxSetting.excessInsuranceRate = 1;
      //   recalculatedTaxSetting.isInsuranceFeePaid = false;
      //   recalculatedTaxSetting.mandatoryInsuranceFeeRate = 10;
      //   recalculatedTaxSetting.mandatoryInsuranceFeeIsPaid = false;
      //   recalculatedTaxSetting.additionalInsuranceFeeIsPaid = false;
      //   recalculatedTaxSetting.requiresAdditionalInsuranceFee = true;
      // }
    }
  }

  return { recalculatedTaxSetting };
};

export default recalculateTaxSettingAfterReportDeletion;
