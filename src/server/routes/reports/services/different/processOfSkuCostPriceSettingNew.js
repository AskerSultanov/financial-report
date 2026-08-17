import calc from "../calcServices/index.js";
import truncateNum from "../reportParsing/truncateNum.js";
import recalculateFinalSkuMetrics from "./recalculateFinalSkuMetrics.js";
import calcRestSkuParamNew from "../calcServices/utils/restSKUParamsNew.js";

var currentYearPostfix = "InCurrentYear";
var endYearPostfix = "InNextYear";

var processOfSkuCostPriceSetting = async (sku, taxParams, prevSkuData, postfix) => {
  var { year } = taxParams;

  if (postfix) {
    var finalProfitKey;
    var preTaxProfitKey;
    var insuranceFeeKey;

    var { updatedSkuFields, updatedTaxParams } = calcRestSkuParamNew(sku, taxParams, postfix);

    if (postfix.startsWith(currentYearPostfix)) {
      preTaxProfitKey = "preTaxProfit" + currentYearPostfix;
      finalProfitKey = "finalProfit" + currentYearPostfix;
      insuranceFeeKey = "insuranceFee" + currentYearPostfix;

      updatedSkuFields.preTaxProfit = truncateNum(sku.preTaxProfitInNextYear + updatedSkuFields[preTaxProfitKey]);
      updatedSkuFields.finalProfit = truncateNum(sku.finalProfitInNextYear + updatedSkuFields[finalProfitKey]);
      updatedSkuFields.insuranceFee = truncateNum(sku.insuranceFeeInNextYear + updatedSkuFields[insuranceFeeKey]);
    } else {
      preTaxProfitKey = "preTaxProfit" + endYearPostfix;
      finalProfitKey = "finalProfit" + endYearPostfix;
      insuranceFeeKey = "insuranceFee" + endYearPostfix;

      updatedSkuFields.preTaxProfit = truncateNum(sku.preTaxProfitInCurrentYear + updatedSkuFields[preTaxProfitKey]);
      updatedSkuFields.finalProfit = truncateNum(sku.finalProfitInCurrentYear + updatedSkuFields[finalProfitKey]);
      updatedSkuFields.insuranceFee = truncateNum(sku.insuranceFeeInCurrentYear + updatedSkuFields[insuranceFeeKey]);
    }

    updatedSkuFields.profitMargin = calc.profitMargin(updatedSkuFields.finalProfit, sku.retailAmount);

    var updatedSkuNew = { userId: sku?.userId, reportId: sku?.reportId, skuName: sku.skuName, updatedSkuFields };
    return { taxParams: updatedTaxParams, updatedSkuNew };
  } else {
    var { updatedSkuFields, updatedTaxParams } = calcRestSkuParamNew(sku, taxParams);

    var updatedSkuNew = { userId: sku?.userId, reportId: sku?.reportId, skuName: sku.skuName, updatedSkuFields };
    return { taxParams: updatedTaxParams, updatedSkuNew };
  }
};

export default processOfSkuCostPriceSetting;
