var getZeroedReportTotals = () => {
  return {
    dateFrom: "",
    dateTo: "",
    reportIds: "",
    totalRetailAmount: 0,
    totalSellerPayoutAmount: 0,
    totalSold: 0,
    totalDeliveryCost: 0,
    totalStorageCost: 0,
    totalPaidAcceptance: 0,
    totalFines: 0,
    totalDeductionOrPayment: 0,
    totalAdvertisingCosts: 0,
    totalOtherExpenses: 0,
    totalProductsCosts: 0,
    totalTaxableAmount: 0,
    totalTaxAmount: 0,
    totalProfitMargin: 0,
    totalFinalProfit: 0,
    totalReturnAmount: 0,
  };
};

export default getZeroedReportTotals;
