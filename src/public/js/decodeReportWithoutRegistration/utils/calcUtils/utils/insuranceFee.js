import truncateNum from "../../reportParsing/truncateNum.js";

var calcInsuranceFee = (preTaxProfit, insuranceFeePercentage) => {
  if (insuranceFeePercentage <= 0 || preTaxProfit <= 0) {
    return 0;
  }

  var insuranceFee = (preTaxProfit * insuranceFeePercentage) / 100;

  return truncateNum(insuranceFee);
};

export default calcInsuranceFee;
