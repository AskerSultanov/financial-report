import calcFinalProfit from "./finalProfit.js";
import calcProfitMargin from "./profitMargin.js";
import calcInsuranceFee from "./insuranceFee.js";
import calcPreTaxProfit from "./preTaxProfit.js";
import truncateNum from "../../reportParsing/truncateNum.js";

var calcRestSkuParams = (sku, prevSkuData, taxSetting) => {
  var updatedSkuFields = {};

  updatedSkuFields.isCostPriceSet = true;
  updatedSkuFields.costPrice = sku.costPrice;
  updatedSkuFields.otherExpenses = sku.otherExpenses;

  var newPreTaxProfit = calcPreTaxProfit(sku);
  sku.preTaxProfit = newPreTaxProfit;
  updatedSkuFields.preTaxProfit = newPreTaxProfit;

  var prevSkuInsuranceFee = prevSkuData.insuranceFee;
  //var { skuInsuranceFee, isInsuranceFeeIncluded, updatedTaxSettingFields } = recalculateInsuranceFee(updatedSkuFields, prevSkuInsuranceFee, taxSetting);

  //sku.insuranceFee = skuInsuranceFee;
  //updatedSkuFields.insuranceFee = skuInsuranceFee;
  //updatedSkuFields.isInsuranceFeeIncluded = isInsuranceFeeIncluded;

  var newFinalProfit = calcFinalProfit(sku);
  var newProfitMargin = calcProfitMargin(newFinalProfit, sku.retailAmount);

  updatedSkuFields.finalProfit = newFinalProfit;
  updatedSkuFields.profitMargin = newProfitMargin;

  return { updatedSkuFields, updatedTaxSettingFieldsBySku: taxSetting };
};

export default calcRestSkuParams;

var recalculateInsuranceFee = function (
  updatedSkuFields,
  prevSkuInsuranceFee,
  taxSetting,
) {
  var skuInsuranceFee = 0;
  var isInsuranceFeeIncluded = false;

  var updatedTaxSettingFields = {};
  updatedTaxSettingFields.finalProfit = taxSetting.finalProfit;
  updatedTaxSettingFields.otherExpenses = taxSetting.otherExpenses;
  //updatedTaxSettingFields.paidInsuranceFee = taxSetting.paidInsuranceFee;

  if (taxSetting.mandatoryInsuranceFeeIsPaid) {
    return { skuInsuranceFee, isInsuranceFeeIncluded, updatedTaxSettingFields };
  }

  //skuInsuranceFee = calcInsuranceFee(updatedSkuFields.preTaxProfit, taxSetting.mandatoryInsuranceFeeRate);

  //isInsuranceFeeIncluded = true;

  //var recalculatedPaidInsuranceFee = taxSetting.paidInsuranceFee - prevSkuInsuranceFee + skuInsuranceFee;
  //updatedTaxSettingFields.paidInsuranceFee = truncateNum(recalculatedPaidInsuranceFee);

  if (
    updatedTaxSettingFields.paidInsuranceFee >= taxSetting.mandatoryInsuranceFee
  ) {
    var difference =
      updatedTaxSettingFields.paidInsuranceFee -
      taxSetting.mandatoryInsuranceFee;

    skuInsuranceFee -= difference;

    if (skuInsuranceFee === 0) {
      isInsuranceFeeIncluded = false;
    }

    updatedTaxSettingFields.mandatoryInsuranceFeeRate = 0;
    updatedTaxSettingFields.mandatoryInsuranceFeeIsPaid = true;
    updatedTaxSettingFields.paidInsuranceFee = taxSetting.mandatoryInsuranceFee;
  }

  var totalInsuranceFee =
    updatedTaxSettingFields.paidInsuranceFee +
    taxSetting.additionalInsuranceFee;

  if (totalInsuranceFee >= taxSetting.maxInsuranceFee) {
    updatedTaxSettingFields.excessInsuranceRate = 0;
    updatedTaxSettingFields.isInsuranceFeePaid = true;
    updatedTaxSettingFields.mandatoryInsuranceFeeRate = 0;
    updatedTaxSettingFields.mandatoryInsuranceFeeIsPaid = true;
    updatedTaxSettingFields.additionalInsuranceFeeIsPaid = true;
    updatedTaxSettingFields.requiresAdditionalInsuranceFee = false;
  }

  return { skuInsuranceFee, isInsuranceFeeIncluded, updatedTaxSettingFields };
};
