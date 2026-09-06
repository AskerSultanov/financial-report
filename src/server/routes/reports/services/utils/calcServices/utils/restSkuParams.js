import calcFinalProfit from "./finalProfit.js";
import calcProfitMargin from "./profitMargin.js";
import calcInsuranceFee from "./insuranceFee.js";
import calcPreTaxProfit from "./preTaxProfit.js";
import truncateNum from "../../reportParsing/truncateNum.js";

var calcRestSkuParams = (sku, prevSkuData, taxParams) => {
  var updatedSkuFields = {};

  updatedSkuFields.isCostPriceSet = true;
  updatedSkuFields.costPrice = sku.costPrice;
  updatedSkuFields.otherExpenses = sku.otherExpenses;

  var newPreTaxProfit = calcPreTaxProfit(sku);
  sku.preTaxProfit = newPreTaxProfit;
  updatedSkuFields.preTaxProfit = newPreTaxProfit;

  var prevSkuInsuranceFee = prevSkuData.insuranceFee;
  var { skuInsuranceFee, isInsuranceFeeIncluded, updatedTaxParamsFields } = recalculateInsuranceFee(updatedSkuFields, prevSkuInsuranceFee, taxParams);

  sku.insuranceFee = skuInsuranceFee;
  updatedSkuFields.insuranceFee = skuInsuranceFee;
  updatedSkuFields.isInsuranceFeeIncluded = isInsuranceFeeIncluded;

  var newFinalProfit = calcFinalProfit(sku);
  var newProfitMargin = calcProfitMargin(newFinalProfit, sku.retailAmount);

  updatedSkuFields.finalProfit = newFinalProfit;
  updatedSkuFields.profitMargin = newProfitMargin;

  return { updatedSkuFields, updatedTaxParamsFieldsBySku: updatedTaxParamsFields };
};

export default calcRestSkuParams;

var recalculateInsuranceFee = function (updatedSkuFields, prevSkuInsuranceFee, taxParams) {
  var skuInsuranceFee = 0;
  var isInsuranceFeeIncluded = false;

  var updatedTaxParamsFields = {};
  updatedTaxParamsFields.finalProfit = taxParams.finalProfit;
  updatedTaxParamsFields.otherExpenses = taxParams.otherExpenses;
  updatedTaxParamsFields.paidInsuranceFee = taxParams.paidInsuranceFee;

  if (taxParams.mandatoryInsuranceFeeIsPaid) {
    return { skuInsuranceFee, isInsuranceFeeIncluded, updatedTaxParamsFields };
  }

  skuInsuranceFee = calcInsuranceFee(updatedSkuFields.preTaxProfit, taxParams.mandatoryInsuranceFeeRate);

  isInsuranceFeeIncluded = true;

  var recalculatedPaidInsuranceFee = taxParams.paidInsuranceFee - prevSkuInsuranceFee + skuInsuranceFee;
  updatedTaxParamsFields.paidInsuranceFee = truncateNum(recalculatedPaidInsuranceFee);

  if (updatedTaxParamsFields.paidInsuranceFee >= taxParams.mandatoryInsuranceFee) {
    var difference = updatedTaxParamsFields.paidInsuranceFee - taxParams.mandatoryInsuranceFee;

    skuInsuranceFee -= difference;

    if (skuInsuranceFee === 0) {
      isInsuranceFeeIncluded = false;
    }

    updatedTaxParamsFields.mandatoryInsuranceFeeRate = 0;
    updatedTaxParamsFields.mandatoryInsuranceFeeIsPaid = true;
    updatedTaxParamsFields.paidInsuranceFee = taxParams.mandatoryInsuranceFee;
  }

  var totalInsuranceFee = updatedTaxParamsFields.paidInsuranceFee + taxParams.additionalInsuranceFee;

  if (totalInsuranceFee >= taxParams.maxInsuranceFee) {
    updatedTaxParamsFields.excessInsuranceRate = 0;
    updatedTaxParamsFields.isInsuranceFeePaid = true;
    updatedTaxParamsFields.mandatoryInsuranceFeeRate = 0;
    updatedTaxParamsFields.mandatoryInsuranceFeeIsPaid = true;
    updatedTaxParamsFields.additionalInsuranceFeeIsPaid = true;
    updatedTaxParamsFields.requiresAdditionalInsuranceFee = false;
  }

  return { skuInsuranceFee, isInsuranceFeeIncluded, updatedTaxParamsFields };
};
