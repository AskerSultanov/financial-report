import truncateNum from "../../reportParsing/truncateNum.js";

var calcFinalProfit = (sku) => {
  var finalProfit = sku.preTaxProfit - sku.tax - sku.insuranceFee - sku.additionalInsuranceFee;
  
  return truncateNum(finalProfit);
};

export default calcFinalProfit;
