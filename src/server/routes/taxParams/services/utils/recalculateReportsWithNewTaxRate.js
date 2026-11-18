import calc from "../../../reports/services/utils/calcUtils/index.js";
import truncateNum from "../../../reports/services/utils/reportParsing/truncateNum.js";

var recalculateReportsWithNewTaxRate = (
  reports,
  paidTaxAmount,
  newTaxRate,
  taxYear,
) => {
  var finalProfit = 0;

  var updatedSkus = [];

  for (var { reportId, skus } of reports) {
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

        updatedSkus.push({
          reportId,
          year: sku.year,
          skuName: sku.skuName,
          data: updatedSkuFields,
        });
      }
    }
  }

  return {
    updatedSkus,
    finalProfit: truncateNum(finalProfit),
    paidTaxAmount: truncateNum(paidTaxAmount),
  };
};

export default recalculateReportsWithNewTaxRate;
