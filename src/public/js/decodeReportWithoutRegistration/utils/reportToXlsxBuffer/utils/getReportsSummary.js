import getZeroedReportTotals from "./getZeroedReportTotals.js";
import calcReportTotalsFromSkus from "../../calcUtils/utils/calcReportTotalsFromSkus.js";

var getReportsSummary = async (reports) => {
  var summary = getZeroedReportTotals();

  summary.dateFrom = "";
  summary.dateTo = "";

  for (var report of reports) {
    var { reportTotals } = calcReportTotalsFromSkus(report.skus);

    summary.retailAmount += reportTotals.retailAmount;
    summary.sellerPayoutAmount += reportTotals.sellerPayoutAmount;
    summary.sold += reportTotals.sold;
    summary.returnAmount += reportTotals.returnAmount;
    summary.deliveryCost += reportTotals.deliveryCost;
    summary.storageCost += reportTotals.storageCost;
    summary.paidAcceptance += reportTotals.paidAcceptance;
    summary.fines += reportTotals.fines;
    summary.otherExpenses += reportTotals.otherExpenses;
    summary.deductionOrPayment += reportTotals.deductionOrPayment;
    summary.advertisingCosts += reportTotals.advertisingCosts;
    summary.productsCosts += reportTotals.productCosts ?? 0;
    summary.profitMargin += reportTotals.profitMargin;
    summary.finalProfit += reportTotals.finalProfit;
  }

  return { summary };
};

export default getReportsSummary;
