import calcFinalProfit from "./finalProfit.js";
import calcProfitMargin from "./profitMargin.js";
import calcInsuranceFee from "./insuranceFee.js";
import calcPreTaxProfit from "./preTaxProfit.js";
import truncateNum from "../../reportParsing/truncateNum.js";

var calcRestSkuParams = (sku, taxParams, postfix = "") => {
  var updatedSkuFields = {};

  var costPriceKey = "costPrice" + postfix;
  var finalProfitKey = "finalProfit" + postfix;
  var preTaxProfitKey = "preTaxProfit" + postfix;
  var profitMarginKey = "profitMargin" + postfix;
  var retailAmountKey = "retailAmount" + postfix;
  var insuranceFeeKey = "insuranceFee" + postfix;
  var otherExpensesKey = "otherExpenses" + postfix;
  var isCostPriceSetKey = "isCostPriceSet" + postfix;

  updatedSkuFields[isCostPriceSetKey] = true;
  updatedSkuFields[costPriceKey] = sku[costPriceKey];
  updatedSkuFields[otherExpensesKey] = sku[otherExpensesKey];
  updatedSkuFields[preTaxProfitKey] = calcPreTaxProfit(sku, postfix);

  var prevSkuInsuranceFee = sku[insuranceFeeKey];

  var { updatedSkuFields, updatedTaxParamsFields } = recalculateInsuranceFee(updatedSkuFields, prevSkuInsuranceFee, taxParams, postfix);

  if (!sku[finalProfitKey]) {
    sku[finalProfitKey] = 0;
  }

  sku[insuranceFeeKey] = updatedSkuFields[insuranceFeeKey];
  sku[preTaxProfitKey] = updatedSkuFields[preTaxProfitKey];

  updatedSkuFields[finalProfitKey] = calcFinalProfit(sku, postfix);
  updatedSkuFields[profitMarginKey] = calcProfitMargin(updatedSkuFields[finalProfitKey], sku[retailAmountKey]);

  updatedSkuFields = Object.assign(updatedSkuFields, updatedSkuFields);

  return { updatedSkuFields, updatedTaxParamsFieldsBySku: updatedTaxParamsFields };
};

export default calcRestSkuParams;

var recalculateInsuranceFee = function (updatedSkuFields, prevSkuInsuranceFee, taxParams, postfix) {
  var insuranceFeeKey = "insuranceFee" + postfix;
  var preTaxProfitKey = "preTaxProfit" + postfix;
  var isInsuranceFeeIncludedKey = "isInsuranceFeeIncluded" + postfix;

  var updatedTaxParamsFields = {};
  updatedTaxParamsFields.finalProfit = taxParams.finalProfit;
  updatedTaxParamsFields.otherExpenses = taxParams.otherExpenses;
  updatedTaxParamsFields.paidInsuranceFee = taxParams.paidInsuranceFee;

  if (taxParams.mandatoryInsuranceFeeIsPaid) {
    updatedSkuFields[insuranceFeeKey] = 0;
    updatedSkuFields[isInsuranceFeeIncludedKey] = false;

    return { updatedSkuFields, updatedTaxParamsFields };
  }

  updatedSkuFields[insuranceFeeKey] = calcInsuranceFee(updatedSkuFields[preTaxProfitKey], taxParams.mandatoryInsuranceFeeRate);
  updatedSkuFields[isInsuranceFeeIncludedKey] = true;

  var recalculatedPaidInsuranceFee = taxParams.paidInsuranceFee - prevSkuInsuranceFee + updatedSkuFields[insuranceFeeKey];
  updatedTaxParamsFields.paidInsuranceFee = truncateNum(recalculatedPaidInsuranceFee);

  if (updatedTaxParamsFields.paidInsuranceFee >= taxParams.mandatoryInsuranceFee) {
    var difference = updatedTaxParamsFields.paidInsuranceFee - taxParams.mandatoryInsuranceFee;

    var newInsuranceFee = updatedSkuFields[insuranceFeeKey] - difference;

    if (newInsuranceFee === 0) {
      updatedSkuFields[isInsuranceFeeIncludedKey] = false;
    }

    updatedSkuFields[insuranceFeeKey] = newInsuranceFee;

    updatedTaxParamsFields.mandatoryInsuranceFeeRate = 0;
    updatedTaxParamsFields.mandatoryInsuranceFeeIsPaid = true;
    updatedTaxParamsFields.paidInsuranceFee = taxParams.mandatoryInsuranceFee;
  }

  var totalInsuranceFee = updatedTaxParamsFields.paidInsuranceFee + taxParams.additionalInsuranceFee;

  if (totalInsuranceFee >= taxParams.maxInsuranceFee) {
    updatedTaxParamsFields.excessInsuranceRate = 0;
    updatedTaxParamsFields.insuranceFeeIsPaid = true;
    updatedTaxParamsFields.mandatoryInsuranceFeeRate = 0;
    updatedTaxParamsFields.mandatoryInsuranceFeeIsPaid = true;
    updatedTaxParamsFields.additionalInsuranceFeeIsPaid = true;
    updatedTaxParamsFields.requiresAdditionalInsuranceFee = false;
  }

  return { updatedSkuFields, updatedTaxParamsFields };
};
