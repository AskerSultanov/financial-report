import calc from "../../reports/services/calcServices/index.js";
import truncateNum from "../../reports/services/reportParsing/truncateNum.js";

var currentYearPostfix = "InCurrentYear";
var nextYearPostfix = "InNextYear";

var recalculateReportsWithNewTaxRate = (reports, paidTaxAmount, newTaxRate, taxYear) => {
  var finalProfit = 0;

  for (var report of reports) {
    var postfix = "";

    if (report.isCrossYearPeriod) {
      var startYear = +report.dateFrom.split("-")[0];
      postfix = startYear == taxYear ? currentYearPostfix : nextYearPostfix;
    }

    var taxKey = "tax" + postfix;
    var finalProfitKey = "finalProfit" + postfix;
    var taxableAmountKey = "taxableAmount" + postfix;
    var totalTaxAmountKey = "totalTaxAmount" + postfix;
    var totalFinalProfitKey = "totalFinalProfit" + postfix;

    for (var sku of report.skus) {
      if (report.isCrossYearPeriod) {
        var prevSkuTax = sku[taxKey];
        sku[taxKey] = calc.taxAmount(sku[taxableAmountKey], newTaxRate);
        sku.tax = sku.taxInCurrentYear + sku.taxInNextYear;
        paidTaxAmount += sku[taxKey];

        if (sku.isCostPriceSet) {
          var prevSkuFinalProfit = sku[finalProfitKey];

          sku[finalProfitKey] = calc.finalProfit(sku, postfix);

          sku.finalProfit = sku.finalProfitInCurrentYear + sku.finalProfitInNextYear;
          finalProfit += sku[finalProfitKey];
        }
      } else {
        var prevSkuTax = sku.tax;
        sku.tax = calc.taxAmount(sku.taxableAmount, newTaxRate);
        paidTaxAmount += sku.tax;

        if (sku.isCostPriceSet) {
          var prevSkuFinalProfit = sku.finalProfit;
          sku.finalProfit = calc.finalProfit(sku, postfix);
          finalProfit += sku.finalProfit;
        }
      }
    }

    if (postfix) {
      report[totalTaxAmountKey] = calc.sum(report.skus, "tax" + postfix, "truncate-on");
      report.totalTaxAmount = report.totalTaxAmountInCurrentYear + report.totalTaxAmountInNextYear;

      report[totalFinalProfitKey] = calc.sum(report.skus, "finalProfit" + postfix, "truncate-on");
      report.totalFinalProfit = report.totalFinalProfitInCurrentYear + report.totalFinalProfitInNextYear;
    } else {
      report.taxRate = newTaxRate;
      report.totalTaxAmount = calc.sum(report.skus, "tax", "truncate-on");
      report.totalFinalProfit = calc.sum(report.skus, "finalProfit", "truncate-on");
    }

    postfix = "";
  }

  return {
    finalProfit: truncateNum(finalProfit),
    paidTaxAmount: truncateNum(paidTaxAmount),
    updatedReports: reports,
  };
};

export default recalculateReportsWithNewTaxRate;
