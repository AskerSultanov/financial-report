import calc from "../../reports/services/calcServices/index.js";
import truncateNum from "../../reports/services/reportParsing/truncateNum.js";

var recalculateReportsWithNewMandatoryInsuranceRate = (taxYear, reports, mandatoryInsuranceFee, mandatoryInsuranceRate) => {
  var updatedReports = [];

  var finalProfit = 0;
  var paidInsuranceFee = 0;
  var mandatoryInsuranceFeeIsPaid = false;

  for (var { reportId, skus } of reports) {
    var updatedSkus = [];

    for (var sku of skus) {
      if (sku.year === taxYear) {
        var updatedSkuFields = {};

        var newSkuInsuranceFee = 0;

        if (sku.isCostPriceSet) {
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
          var newSkuFinalProfit = calc.sku.finalProfit(sku);

          finalProfit += newSkuFinalProfit;
          updatedSkuFields.finalProfit = newSkuFinalProfit;
          updatedSkuFields.insuranceFee = newSkuInsuranceFee;
        }

        if (Object.keys(updatedSkuFields).length) {
          updatedSkus.push({ skuName: sku.skuName, data: updatedSkuFields });
        }
      }
    }

    updatedReports.push({ reportId, updatedSkus });
  }

  return {
    finalProfit,
    updatedReports,
    paidInsuranceFee,
    mandatoryInsuranceFeeIsPaid,
  };
};

export default recalculateReportsWithNewMandatoryInsuranceRate;
