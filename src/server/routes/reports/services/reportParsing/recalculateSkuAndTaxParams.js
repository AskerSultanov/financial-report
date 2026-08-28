import truncateNum from "./truncateNum.js";
import calcInsuranceFee from "../calcServices/utils/insuranceFee.js";

var recalculateSkuAndTaxParams = (sku, taxParams) => {
  var updatedTaxParams = { ...taxParams };

  var { skuAdditionalInsuranceFee, newTaxRetailAmount, hasExcessIncomeForInsurance, requiresAdditionalInsuranceFee } = recalculateTaxParamRetailAmountAndSkuAdditionalInsuranceFee(
    sku.retailAmount,
    taxParams,
  );

  updatedTaxParams = Object.assign(updatedTaxParams, { hasExcessIncomeForInsurance, requiresAdditionalInsuranceFee, retailAmount: newTaxRetailAmount });

  var { recalculatedSkuAdditionalInsuranceFee, newTaxParamsAdditionalInsuranceFee, ...restUpdatedTaxParams } = recalculateInsuranceFee(skuAdditionalInsuranceFee, updatedTaxParams);

  updatedTaxParams = Object.assign(updatedTaxParams, { additionalInsuranceFee: newTaxParamsAdditionalInsuranceFee, ...restUpdatedTaxParams });

  updatedTaxParams.paidTaxAmount = taxParams.paidTaxAmount + sku.tax;

  updatedTaxParams.taxableAmount = taxParams.taxableAmount + sku.taxableAmount;

  return { skuAdditionalInsuranceFee: recalculatedSkuAdditionalInsuranceFee, updatedTaxParams };
};

export default recalculateSkuAndTaxParams;

var recalculateTaxParamRetailAmountAndSkuAdditionalInsuranceFee = function (skuRetailAmount, taxParams) {
  var prevRetailAmount = taxParams.retailAmount;
  var newTaxRetailAmount = taxParams.retailAmount + skuRetailAmount;

  var skuAdditionalInsuranceFee = 0;
  var hasExcessIncomeForInsurance = false;
  var requiresAdditionalInsuranceFee = false;

  if (newTaxRetailAmount > taxParams.excessIncomeForAdditionalInsuranceFee) {
    hasExcessIncomeForInsurance = true;
    requiresAdditionalInsuranceFee = true;

    var difference = taxParams.excessIncomeForAdditionalInsuranceFee - prevRetailAmount;

    if (difference > 0) {
      difference = skuRetailAmount - difference;
      skuAdditionalInsuranceFee = calcInsuranceFee(difference, taxParams.excessInsuranceRate);
    } else {
      skuAdditionalInsuranceFee = calcInsuranceFee(skuRetailAmount, taxParams.excessInsuranceRate);
    }
  }

  return { skuAdditionalInsuranceFee, hasExcessIncomeForInsurance, requiresAdditionalInsuranceFee, newTaxRetailAmount };
};

var recalculateInsuranceFee = function (skuAdditionalInsuranceFee, taxParams) {
  var isInsuranceFeePaid = false;
  var mandatoryInsuranceFeeIsPaid = true;
  var additionalInsuranceFeeIsPaid = false;
  var requiresAdditionalInsuranceFee = true;
  var excessInsuranceRate = taxParams.excessInsuranceRate;
  var insuranceFeePercentage = taxParams.insuranceFeePercentage;
  var recalculatedSkuAdditionalInsuranceFee = skuAdditionalInsuranceFee;
  var newTaxParamsAdditionalInsuranceFee = taxParams.additionalInsuranceFee + skuAdditionalInsuranceFee;

  if (!requiresAdditionalInsuranceFee) {
    return {
      isInsuranceFeePaid,
      excessInsuranceRate,
      insuranceFeePercentage,
      mandatoryInsuranceFeeIsPaid,
      additionalInsuranceFeeIsPaid,
      requiresAdditionalInsuranceFee,
      newTaxParamsAdditionalInsuranceFee,
      recalculatedSkuAdditionalInsuranceFee,
    };
  }

  var prevAdditionalInsuranceFee = taxParams.additionalInsuranceFee;

  var paidInsuranceFee = taxParams.paidInsuranceFee + newTaxParamsAdditionalInsuranceFee;
  var maxAdditionalInsuranceFee = taxParams.maxInsuranceFee - taxParams.mandatoryInsuranceFee;

  if (newTaxParamsAdditionalInsuranceFee > maxAdditionalInsuranceFee) {
    additionalInsuranceFeeIsPaid = true;
    requiresAdditionalInsuranceFee = false;

    var difference = maxAdditionalInsuranceFee - prevAdditionalInsuranceFee;

    if (difference > 0) {
      var recalculatedSkuAdditionalInsuranceFee = skuAdditionalInsuranceFee + difference;
    }
  }

  if (paidInsuranceFee >= taxParams.maxInsuranceFee) {
    isInsuranceFeePaid = true;
    mandatoryInsuranceFeeIsPaid = true;
    additionalInsuranceFeeIsPaid = true;
    requiresAdditionalInsuranceFee = false;

    excessInsuranceRate = 0;
    insuranceFeePercentage = 0;
  }

  if (newTaxParamsAdditionalInsuranceFee >= maxAdditionalInsuranceFee) {
    excessInsuranceRate = 0;
    additionalInsuranceFeeIsPaid = true;
    requiresAdditionalInsuranceFee = false;
  }

  return {
    isInsuranceFeePaid,
    excessInsuranceRate,
    insuranceFeePercentage,
    mandatoryInsuranceFeeIsPaid,
    additionalInsuranceFeeIsPaid,
    requiresAdditionalInsuranceFee,
    newTaxParamsAdditionalInsuranceFee,
    recalculatedSkuAdditionalInsuranceFee,
  };
};
