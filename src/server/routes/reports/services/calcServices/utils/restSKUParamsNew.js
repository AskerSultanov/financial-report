import calcFinalProfit from "./finalProfit.js";
import calcProfitMargin from "./profitMargin.js";
import calcInsuranceFee from "./insuranceFee.js";
import calcPreTaxProfit from "./preTaxProfit.js";
import truncateNum from "../../reportParsing/truncateNum.js";

var calcRestSKUParams = (sku, taxParams, postfix = "") => {
  var updatedSkuFields = {};

  var costPriceKey = "costPrice" + postfix;
  var finalProfitKey = "finalProfit" + postfix;
  var preTaxProfitKey = "preTaxProfit" + postfix;
  var profitMarginKey = "profitMargin" + postfix;
  var retailAmountKey = "retailAmount" + postfix;
  var isCostPriceSetKey = "isCostPriceSet" + postfix;

  updatedSkuFields[isCostPriceSetKey] = true;
  updatedSkuFields[costPriceKey] = sku[costPriceKey];
  updatedSkuFields[preTaxProfitKey] = calcPreTaxProfit(sku, postfix);

  var { sku, taxParams, skuFieldsWithRecalcInsuranceData } = recalculateInsuranceFee(sku, taxParams, postfix);

  if (!sku[finalProfitKey]) {
    sku[finalProfitKey] = 0;
  }

  updatedSkuFields[finalProfitKey] = calcFinalProfit(sku, postfix);
  updatedSkuFields[profitMarginKey] = calcProfitMargin(updatedSkuFields[finalProfitKey], sku[retailAmountKey]);

  updatedSkuFields = Object.assign(updatedSkuFields, skuFieldsWithRecalcInsuranceData);

  return { updatedTaxParams: taxParams, updatedSkuFields };
};

export default calcRestSKUParams;

var recalculateInsuranceFee = function (sku, taxParams, postfix) {
  var skuFieldsWithRecalcInsuranceData = {};

  var insuranceFeeKey = "insuranceFee" + postfix;
  var preTaxProfitKey = "preTaxProfit" + postfix;
  var isInsuranceFeeIncludedKey = "isInsuranceFeeIncluded" + postfix;

  if (taxParams.mandatoryInsuranceFeeIsPaid) {
    skuFieldsWithRecalcInsuranceData[insuranceFeeKey] = 0;
    skuFieldsWithRecalcInsuranceData[isInsuranceFeeIncludedKey] = false;

    return { sku, taxParams, skuFieldsWithRecalcInsuranceData };
  }

  skuFieldsWithRecalcInsuranceData[insuranceFeeKey] = calcInsuranceFee(sku[preTaxProfitKey], taxParams.mandatoryInsuranceFeeRate);
  skuFieldsWithRecalcInsuranceData[isInsuranceFeeIncludedKey] = true;

  taxParams.paidInsuranceFee += skuFieldsWithRecalcInsuranceData[insuranceFeeKey];

  if (taxParams.paidInsuranceFee >= taxParams.mandatoryInsuranceFee) {
    var difference = taxParams.paidInsuranceFee - taxParams.mandatoryInsuranceFee;

    var newInsuranceFee = skuFieldsWithRecalcInsuranceData[insuranceFeeKey] - difference;
    if (newInsuranceFee === 0) {
      skuFieldsWithRecalcInsuranceData[isInsuranceFeeIncludedKey] = false;
    }

    skuFieldsWithRecalcInsuranceData[insuranceFeeKey] = newInsuranceFee;

    taxParams.mandatoryInsuranceFeeRate = 0;
    taxParams.mandatoryInsuranceFeeIsPaid = true;
    taxParams.paidInsuranceFee = taxParams.mandatoryInsuranceFee;
  }

  var totalInsuranceFee = taxParams.paidInsuranceFee + taxParams.additionalInsuranceFee;

  if (totalInsuranceFee >= taxParams.maxInsuranceFee) {
    taxParams.excessInsuranceRate = 0;
    taxParams.insuranceFeeIsPaid = true;
    taxParams.mandatoryInsuranceFeeRate = 0;
    taxParams.mandatoryInsuranceFeeIsPaid = true;
    taxParams.additionalInsuranceFeeIsPaid = true;
    taxParams.requiresAdditionalInsuranceFee = false;
  }

  return { sku, taxParams, skuFieldsWithRecalcInsuranceData };
};
