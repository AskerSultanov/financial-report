import calc from "../../reports/services/calcServices/index.js";
import truncateNum from "../../reports/services/reportParsing/truncateNum.js";

var recalculateReportsWithNewTaxRate = (reports, paidTaxAmount, newTaxRate, taxYear) => {
  var finalProfit = 0;

  var updatedReports = [];

  for (var { reportId, skus } of reports) {
    var updatedSkus = [];

    for (var sku of skus) {
      if (sku.year === taxYear) {
        var updatedSkuFields = {};

        var prevSkuTax = sku.tax;
        var newSkuTax = calc.taxAmount(sku.taxableAmount, newTaxRate);

        paidTaxAmount += newSkuTax;
        updatedSkuFields.tax = newSkuTax;

        if (sku.isCostPriceSet) {
          sku.tax = newSkuTax;

          var prevSkuFinalProfit = sku.finalProfit;

          var newSkuFinalProfit = calc.sku.finalProfit(sku);

          finalProfit += newSkuFinalProfit;
          updatedSkuFields.finalProfit = newSkuFinalProfit;
        }

        updatedSkus.push({ skuName: sku.skuName, data: updatedSkuFields });
      }
    }

    if (Object.keys(updatedSkuFields).length) {
      updatedReports.push({ reportId, updatedSkus });
    }
  }

  return {
    updatedReports,
    finalProfit: truncateNum(finalProfit),
    paidTaxAmount: truncateNum(paidTaxAmount),
  };
};

export default recalculateReportsWithNewTaxRate;
