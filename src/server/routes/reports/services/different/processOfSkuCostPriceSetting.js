import calc from "../calcServices/index.js";
import truncateNum from "../reportParsing/truncateNum.js";

var currentYearPostfix = "InCurrentYear";
var endYearPostfix = "InNextYear";

var processOfSkuCostPriceSetting = (sku, taxParams, prevSkuData, postfix) => {
  var { year } = taxParams;

  if (postfix) {
    var finalProfitKey;
    var preTaxProfitKey;
    var insuranceFeeKey;
    var otherExpensesKey;

    var { updatedSkuFields, updatedTaxParamsFieldsBySku } = calc.sku.restParams(sku, taxParams, postfix);

    if (postfix.startsWith(currentYearPostfix)) {
      preTaxProfitKey = "preTaxProfit" + currentYearPostfix;
      finalProfitKey = "finalProfit" + currentYearPostfix;
      insuranceFeeKey = "insuranceFee" + currentYearPostfix;
      otherExpensesKey = "otherExpenses" + postfix;

      updatedSkuFields.preTaxProfit = truncateNum(sku.preTaxProfitInNextYear + updatedSkuFields[preTaxProfitKey]);
      updatedSkuFields.finalProfit = truncateNum(sku.finalProfitInNextYear + updatedSkuFields[finalProfitKey]);
      updatedSkuFields.insuranceFee = truncateNum(sku.insuranceFeeInNextYear + updatedSkuFields[insuranceFeeKey]);
      updatedSkuFields.otherExpenses = truncateNum(sku.otherExpensesInNextYear + updatedSkuFields[otherExpensesKey]);
    } else {
      preTaxProfitKey = "preTaxProfit" + endYearPostfix;
      finalProfitKey = "finalProfit" + endYearPostfix;
      insuranceFeeKey = "insuranceFee" + endYearPostfix;
      otherExpensesKey = "otherExpenses" + postfix;

      updatedSkuFields.preTaxProfit = truncateNum(sku.preTaxProfitInCurrentYear + updatedSkuFields[preTaxProfitKey]);
      updatedSkuFields.finalProfit = truncateNum(sku.finalProfitInCurrentYear + updatedSkuFields[finalProfitKey]);
      updatedSkuFields.insuranceFee = truncateNum(sku.insuranceFeeInCurrentYear + updatedSkuFields[insuranceFeeKey]);
      updatedSkuFields.otherExpenses = truncateNum(sku.otherExpensesInCurrentYear + updatedSkuFields[otherExpensesKey]);
    }

    updatedSkuFields.profitMargin = calc.profitMargin(updatedSkuFields.finalProfit, sku.retailAmount);

    var updatedSkuNew = { userId: sku?.userId, reportId: sku?.reportId, skuName: sku.skuName, updatedSkuFields };
    return { updatedSkuFields, updatedTaxParamsFieldsBySku };
  } else {
    var { updatedSkuFields, updatedTaxParamsFieldsBySku } = calc.sku.restParams(sku, taxParams);

    var updatedSkuNew = { userId: sku?.userId, reportId: sku?.reportId, skuName: sku.skuName, updatedSkuFields };
    return { updatedSkuFields, updatedTaxParamsFieldsBySku };
  }
};

export default processOfSkuCostPriceSetting;
