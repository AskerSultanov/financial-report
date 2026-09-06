import truncateNum from "../../reportParsing/truncateNum.js";

var calcProfitMargin = (finalProfit, retailAmount) => {
  var profitMargin = 0;

  if (finalProfit === 0 || retailAmount === 0) {
    return profitMargin;
  }

  profitMargin = (finalProfit * 100) / retailAmount;

  return truncateNum(profitMargin);
};

export default calcProfitMargin;
