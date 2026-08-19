import calc from "../../reports/services/calcServices/index.js";
import truncateNum from "../../reports/services/reportParsing/truncateNum.js";

var startYearPostfix = "InCurrentYear";
var endYearPostfix = "InNextYear";

var recalculateReportsWithNewMandatoryInsuranceRate = (taxYear, reports, mandatoryInsuranceFee, mandatoryInsuranceRate) => {
  var finalProfit = 0;
  var paidInsuranceFee = 0;
  var mandatoryInsuranceFeeIsPaid = false;

  for (var report of reports) {
    var postfix = "";

    if (report.isCrossYearPeriod) {
      var startYear = +report.dateFrom.split("-")[0];
      postfix = startYear == taxYear ? startYearPostfix : endYearPostfix;
    }

    var finalProfitKey = "finalProfit" + postfix;
    var preTaxProfitKey = "preTaxProfit" + postfix;
    var insuranceFeeKey = "insuranceFeeKey" + postfix;
    var isCostPriceSetKey = "isCostPriceSet" + postfix;
    var totalFinalProfitKey = "totalFinalProfit" + postfix;
    var totalInsuranceFeeKey = "totalInsuranceFee" + postfix;

    for (var sku of report.skus) {
      if (report.isCrossYearPeriod) {
        var prevSkuInsuranceFee = sku[insuranceFeeKey];

        if (sku[isCostPriceSetKey]) {
          var prevSkuFinalProfit = sku[finalProfitKey];
          var newSkuInsuranceFee = 0;

          if (!mandatoryInsuranceFeeIsPaid) {
            newSkuInsuranceFee = calc.insuranceFee(sku[preTaxProfitKey], mandatoryInsuranceRate);
          }

          sku[insuranceFeeKey] = newSkuInsuranceFee;
          paidInsuranceFee += newSkuInsuranceFee;

          if (paidInsuranceFee > mandatoryInsuranceFee) {
            var difference = paidInsuranceFee - mandatoryInsuranceFee;
            newSkuInsuranceFee -= difference;
            mandatoryInsuranceFeeIsPaid = true;
          }

          sku[finalProfitKey] = calc.finalProfit(sku, postfix);

          sku.insuranceFee = sku.insuranceFeeInCurrentYear + sku.insuranceFeeInNextYear;
          sku.finalProfit = sku.finalProfitInCurrentYear + sku.finalProfitInNextYear;

          finalProfit += sku[finalProfitKey];
        }
      } else {
        var prevSkuInsuranceFee = sku.insuranceFee;
        var newSkuInsuranceFee = 0;

        if (sku[isCostPriceSetKey]) {
          var prevSkuFinalProfit = sku.finalProfit;

          if (!mandatoryInsuranceFeeIsPaid) {
            newSkuInsuranceFee = calc.insuranceFee(sku.preTaxProfit, mandatoryInsuranceRate);
          }

          paidInsuranceFee += newSkuInsuranceFee;

          if (paidInsuranceFee > mandatoryInsuranceFee) {
            var difference = paidInsuranceFee - mandatoryInsuranceFee;
            newSkuInsuranceFee -= difference;
            mandatoryInsuranceFeeIsPaid = true;
          }

          sku.insuranceFee = newSkuInsuranceFee;
          sku.finalProfit = calc.finalProfit(sku, postfix);

          finalProfit += sku.finalProfit;
        }
      }
    }

    if (postfix) {
      report[totalInsuranceFeeKey] = calc.sum(report.skus, "insuranceFee" + postfix, "truncate-on");
      report.totalInsuranceFee = report.totalInsuranceFeeInCurrentYear + report.totalInsuranceFeeInNextYear;

      report[totalFinalProfitKey] = calc.sum(report.skus, "finalProfit" + postfix, "truncate-on");
      report.totalFinalProfit = report.totalFinalProfitInCurrentYear + report.totalFinalProfitInNextYear;
    } else {
      report.totalInsuranceFee = calc.sum(report.skus, "insuranceFee", "truncate-on");
      report.totalFinalProfit = calc.sum(report.skus, "finalProfit", "truncate-on");
    }

    postfix = "";
  }

  return {
    finalProfit,
    paidInsuranceFee,
    updatedReports: reports,
    mandatoryInsuranceFeeIsPaid,
  };
};

export default recalculateReportsWithNewMandatoryInsuranceRate;
