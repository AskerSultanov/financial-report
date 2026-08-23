import truncateNum from "./truncateNum.js";
import calcInsuranceFee from "../calcServices/utils/insuranceFee.js";

var recalculateSkuAndTaxParams = (sku, taxParams) => {
  var { sku, taxParams } = recalculateRetailAmount(sku, taxParams);
  var { sku, taxParams } = recalculateInsuranceFee(sku, taxParams);
  var { sku, taxParams } = recalculatePaidTaxAmount(sku, taxParams);
  var { sku, taxParams } = recalculateTaxableAmount(sku, taxParams);

  taxParams.retailAmount = truncateNum(taxParams.retailAmount);
  taxParams.taxableAmount = truncateNum(taxParams.taxableAmount);
  taxParams.paidTaxAmount = truncateNum(taxParams.paidTaxAmount);
  taxParams.additionalInsuranceFee = truncateNum(taxParams.additionalInsuranceFee);

  return { updatedSku: sku, recalculatedTaxParams: taxParams };
};

export default recalculateSkuAndTaxParams;

var recalculateRetailAmount = function (sku, taxParams) {
  var oldRetailAmount = taxParams.retailAmount;
  taxParams.retailAmount += sku.retailAmount;

  if (taxParams.retailAmount > taxParams.excessIncomeForAdditionalInsuranceFee) {
    taxParams.hasExcessIncomeForInsurance = true;
    taxParams.requiresAdditionalInsuranceFee = true;

    var difference = taxParams.excessIncomeForAdditionalInsuranceFee - oldRetailAmount;

    if (difference > 0) {
      difference = sku.retailAmount - difference;
      sku.additionalInsuranceFee = calcInsuranceFee(difference, taxParams.excessInsuranceRate);
    } else {
      sku.additionalInsuranceFee = calcInsuranceFee(sku.retailAmount, taxParams.excessInsuranceRate);
    }
  } else {
    sku.additionalInsuranceFee = 0;
  }

  return { sku, taxParams };
};

var recalculateInsuranceFee = function (sku, taxParams) {
  if (!taxParams.requiresAdditionalInsuranceFee) {
    return { sku, taxParams };
  }

  var oldAdditionalInsuranceFee = taxParams.additionalInsuranceFee;
  taxParams.additionalInsuranceFee += sku.additionalInsuranceFee;

  var paidInsuranceFee = taxParams.paidInsuranceFee + taxParams.additionalInsuranceFee;
  var maxAdditionalInsuranceFee = taxParams.maxInsuranceFee - taxParams.mandatoryInsuranceFee;

  if (taxParams.additionalInsuranceFee > maxAdditionalInsuranceFee) {
    taxParams.additionalInsuranceFeeIsPaid = true;
    taxParams.requiresAdditionalInsuranceFee = false;

    var difference = maxAdditionalInsuranceFee - oldAdditionalInsuranceFee;

    if (difference > 0) {
      var recalculatedSkuAdditionalInsuranceFee = sku.additionalInsuranceFee + difference;
      sku.additionalInsuranceFee = recalculatedSkuAdditionalInsuranceFee;
    }
  }

  if (paidInsuranceFee >= taxParams.maxInsuranceFee) {
    taxParams.isInsuranceFeePaid = true;
    taxParams.mandatoryInsuranceFeeIsPaid = true;
    taxParams.additionalInsuranceFeeIsPaid = true;
    taxParams.requiresAdditionalInsuranceFee = false;

    taxParams.excessInsuranceRate = 0;
    taxParams.insuranceFeePercentage = 0;
  }

  if (taxParams.additionalInsuranceFee >= maxAdditionalInsuranceFee) {
    taxParams.excessInsuranceRate = 0;
    taxParams.additionalInsuranceFeeIsPaid = true;
    taxParams.requiresAdditionalInsuranceFee = false;
  }

  return { sku, taxParams };
};

var recalculatePaidTaxAmount = function (sku, taxParams) {
  taxParams.paidTaxAmount += sku.tax;

  return { sku, taxParams };
};

var recalculateTaxableAmount = function (sku, taxParams) {
  taxParams.taxableAmount += sku.taxableAmount;
  return { sku, taxParams };
};
