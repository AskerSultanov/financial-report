var calcProfitMargin = (finalProfit, retailAmount) => {
  var profitMargin = 0;

  if (finalProfit === 0 || retailAmount === 0) {
    return profitMargin;
  }

  profitMargin = (finalProfit * 100) / retailAmount;

  return profitMargin.toFixed(2);
};

export default calcProfitMargin;
