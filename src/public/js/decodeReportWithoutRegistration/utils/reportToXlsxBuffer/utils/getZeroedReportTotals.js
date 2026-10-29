var getZeroedReportTotals = () => {
  return {
    dateFrom: "",
    dateTo: "",
    retailAmount: 0,
    taxableAmount: 0,
    sold: 0,
    returnAmount: 0,
    sellerPayoutAmount: 0,
    productsCosts: 0,
    otherExpenses: 0,
    deliveryCost: 0,
    paidAcceptance: 0,
    fines: 0,
    deductionOrPayment: 0,
    storageCost: 0,
    advertisingCosts: 0,
    tax: 0,
    profitMargin: 0,
    finalProfit: 0,
  };
};

export default getZeroedReportTotals;
