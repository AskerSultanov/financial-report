import calc from "../../../reports/services/calcServices/index.js";
import truncateNum from "../../../reports/services/reportParsing/truncateNum.js";

var recalculateReportsWithNewTaxRate = (
  reports,
  paidTaxAmount,
  newTaxRate,
  taxYear,
) => {
  var finalProfit = 0;

  var updatedReports = [];

  for (var { reportId, skus } of reports) {
    var updatedSkus = [];

    for (var sku of skus) {
      if (sku.year === taxYear) {
        var updatedSkuFields = {};

        var newSkuTax = calc.taxAmount(sku.taxableAmount, newTaxRate);

        paidTaxAmount += newSkuTax;
        updatedSkuFields.tax = truncateNum(newSkuTax);

        if (sku.isCostPriceSet) {
          sku.tax = newSkuTax;

          var newSkuFinalProfit = calc.sku.finalProfit(sku);

          finalProfit += newSkuFinalProfit;
          updatedSkuFields.finalProfit = truncateNum(newSkuFinalProfit);
        }

        updatedSkus.push({ skuName: sku.skuName, data: updatedSkuFields });
      }
    }

    if (Object.keys(updatedSkus).length) {
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
