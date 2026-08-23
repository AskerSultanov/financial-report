import getZeroedReportTotals from "./getZeroedReportTotals.js";

var getMonthlySummary = async (reports) => {
  var monthlySummary = getZeroedReportTotals();

  var { dateFrom, dateTo } = reports[0];

  monthlySummary.dateFrom = dateFrom;
  monthlySummary.dateTo = dateTo;

  for (var report of reports) {
    monthlySummary.reportIds += report.reportId + "; ";
    monthlySummary.totalRetailAmount += report.totalRetailAmount;
    monthlySummary.totalSellerPayoutAmount += report.totalSellerPayoutAmount;
    monthlySummary.totalSold += report.totalSold;
    monthlySummary.totalReturnAmount += report.totalReturnAmount;
    monthlySummary.totalDeliveryCost += report.totalDeliveryCost;
    monthlySummary.totalStorageCost += report.totalStorageCost;
    monthlySummary.totalPaidAcceptance += report.totalPaidAcceptance;
    monthlySummary.totalFines += report.totalFines;
    monthlySummary.totalOtherExpenses += report.totalOtherExpenses;
    monthlySummary.totalDeductionOrPayment += report.totalDeductionOrPayment;
    monthlySummary.totalAdvertisingCosts += report.totalAdvertisingCosts;
    monthlySummary.totalProductsCosts += report.totalProductCosts ?? 0;
    monthlySummary.totalTaxableAmount += report.totalTaxableAmount;
    monthlySummary.totalTaxAmount += report.totalTaxAmount;
    monthlySummary.totalProfitMargin += report.totalProfitMargin ?? 0;
    monthlySummary.totalFinalProfit += report.totalFinalProfit;
  }

  return monthlySummary;
};

export default getMonthlySummary;
