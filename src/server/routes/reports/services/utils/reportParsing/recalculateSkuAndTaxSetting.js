import truncateNum from "./truncateNum.js";
import calcInsuranceFee from "../calcUtils/utils/insuranceFee.js";

var recalculateSkuAndTaxSetting = (sku, taxSetting) => {
  var updatedTaxSettings = { ...taxSetting };

  // var {
  //   skuAdditionalInsuranceFee,
  //   newTaxRetailAmount,
  //   hasExcessIncomeForInsurance,
  //   requiresAdditionalInsuranceFee,
  // } = recalculateTaxSettingRetailAmountAndSkuAdditionalInsuranceFee(
  //   sku.retailAmount,
  //   taxSetting,
  // );

  // updatedTaxSettings = Object.assign(updatedTaxSettings, {
  //   hasExcessIncomeForInsurance,
  //   requiresAdditionalInsuranceFee,
  //   retailAmount: newTaxRetailAmount,
  // });

  // var {
  //   recalculatedSkuAdditionalInsuranceFee,
  //   newTaxSettingAdditionalInsuranceFee,
  //   ...restUpdatedTaxSetting
  // } = recalculateInsuranceFee(skuAdditionalInsuranceFee, updatedTaxSettings);

  // updatedTaxSettings = Object.assign(updatedTaxSettings, {
  //   additionalInsuranceFee: newTaxSettingAdditionalInsuranceFee,
  //   ...restUpdatedTaxSetting,
  // });

  updatedTaxSettings.paidTaxAmount = taxSetting.paidTaxAmount + sku.tax;
  updatedTaxSettings.retailAmount = taxSetting.retailAmount + sku.retailAmount;
  updatedTaxSettings.taxableAmount =
    taxSetting.taxableAmount + sku.taxableAmount;

  return { updatedTaxSettings };
};

export default recalculateSkuAndTaxSetting;

var recalculateTaxSettingRetailAmountAndSkuAdditionalInsuranceFee = function (
  skuRetailAmount,
  taxSetting,
) {
  var prevRetailAmount = taxSetting.retailAmount;
  var newTaxRetailAmount = taxSetting.retailAmount + skuRetailAmount;

  var skuAdditionalInsuranceFee = 0;
  var hasExcessIncomeForInsurance = false;
  var requiresAdditionalInsuranceFee = false;

  if (newTaxRetailAmount > taxSetting.excessIncomeForAdditionalInsuranceFee) {
    hasExcessIncomeForInsurance = true;
    requiresAdditionalInsuranceFee = true;

    var difference =
      taxSetting.excessIncomeForAdditionalInsuranceFee - prevRetailAmount;

    if (difference > 0) {
      difference = skuRetailAmount - difference;
      skuAdditionalInsuranceFee = calcInsuranceFee(
        difference,
        taxSetting.excessInsuranceRate,
      );
    } else {
      skuAdditionalInsuranceFee = calcInsuranceFee(
        skuRetailAmount,
        taxSetting.excessInsuranceRate,
      );
    }
  }

  return {
    skuAdditionalInsuranceFee,
    hasExcessIncomeForInsurance,
    requiresAdditionalInsuranceFee,
    newTaxRetailAmount,
  };
};

var recalculateInsuranceFee = function (skuAdditionalInsuranceFee, taxSetting) {
  var isInsuranceFeePaid = false;
  var mandatoryInsuranceFeeIsPaid = true;
  var additionalInsuranceFeeIsPaid = false;
  var requiresAdditionalInsuranceFee = true;
  var excessInsuranceRate = taxSetting.excessInsuranceRate;
  var insuranceFeePercentage = taxSetting.insuranceFeePercentage;
  var recalculatedSkuAdditionalInsuranceFee = skuAdditionalInsuranceFee;
  var newTaxSettingAdditionalInsuranceFee =
    taxSetting.additionalInsuranceFee + skuAdditionalInsuranceFee;

  if (!requiresAdditionalInsuranceFee) {
    return {
      isInsuranceFeePaid,
      excessInsuranceRate,
      insuranceFeePercentage,
      mandatoryInsuranceFeeIsPaid,
      additionalInsuranceFeeIsPaid,
      requiresAdditionalInsuranceFee,
      newTaxSettingAdditionalInsuranceFee,
      recalculatedSkuAdditionalInsuranceFee,
    };
  }

  var prevAdditionalInsuranceFee = taxSetting.additionalInsuranceFee;

  var paidInsuranceFee =
    taxSetting.paidInsuranceFee + newTaxSettingAdditionalInsuranceFee;
  var maxAdditionalInsuranceFee =
    taxSetting.maxInsuranceFee - taxSetting.mandatoryInsuranceFee;

  if (newTaxSettingAdditionalInsuranceFee > maxAdditionalInsuranceFee) {
    additionalInsuranceFeeIsPaid = true;
    requiresAdditionalInsuranceFee = false;

    var difference = maxAdditionalInsuranceFee - prevAdditionalInsuranceFee;

    if (difference > 0) {
      var recalculatedSkuAdditionalInsuranceFee =
        skuAdditionalInsuranceFee + difference;
    }
  }

  if (paidInsuranceFee >= taxSetting.maxInsuranceFee) {
    isInsuranceFeePaid = true;
    mandatoryInsuranceFeeIsPaid = true;
    additionalInsuranceFeeIsPaid = true;
    requiresAdditionalInsuranceFee = false;

    excessInsuranceRate = 0;
    insuranceFeePercentage = 0;
  }

  if (newTaxSettingAdditionalInsuranceFee >= maxAdditionalInsuranceFee) {
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
    newTaxSettingAdditionalInsuranceFee,
    recalculatedSkuAdditionalInsuranceFee,
  };
};
