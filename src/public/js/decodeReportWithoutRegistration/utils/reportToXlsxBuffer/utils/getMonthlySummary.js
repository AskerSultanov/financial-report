import getZeroedReportTotals from "./getZeroedReportTotals.js";
import calcReportTotalsFromSkus from "../../calcUtils/utils/calcReportTotalsFromSkus.js";

var getMonthlySummary = async (reports, dateFrom, dateTo) => {
  var monthlySummary = getZeroedReportTotals();

  monthlySummary.dateFrom = dateFrom;
  monthlySummary.dateTo = dateTo;

  for (var report of reports) {
    var { reportTotals } = calcReportTotalsFromSkus(report.skus);

    monthlySummary.retailAmount += reportTotals.retailAmount;
    monthlySummary.sellerPayoutAmount += reportTotals.sellerPayoutAmount;
    monthlySummary.sold += reportTotals.sold;
    monthlySummary.returnAmount += reportTotals.returnAmount;
    monthlySummary.deliveryCost += reportTotals.deliveryCost;
    monthlySummary.storageCost += reportTotals.storageCost;
    monthlySummary.paidAcceptance += reportTotals.paidAcceptance;
    monthlySummary.fines += reportTotals.fines;
    monthlySummary.otherExpenses += reportTotals.otherExpenses;
    monthlySummary.deductionOrPayment += reportTotals.deductionOrPayment;
    monthlySummary.advertisingCosts += reportTotals.advertisingCosts;
    monthlySummary.productsCosts += reportTotals.productCosts ?? 0;
    monthlySummary.profitMargin += reportTotals.profitMargin;
    monthlySummary.finalProfit += reportTotals.finalProfit;
  }

  return { monthlySummary };
};

export default getMonthlySummary;
