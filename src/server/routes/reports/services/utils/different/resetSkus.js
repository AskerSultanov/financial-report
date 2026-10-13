import truncateNum from "../reportParsing/truncateNum.js";

var cleanSku = {
  tax: 0,
  costPrice: 0,
  finalProfit: 0,
  insuranceFee: 0,
  profitMargin: 0,
  isCostPriceSet: false,
  additionalInsuranceFee: 0,
  isInsuranceFeeIncluded: false,
};

var resetSkus = (skus) => {
  var prevTax = 0;
  var prevFinalProfit = 0;
  var prevInsuranceFee = 0;
  var prevAdditionalInsuranceFee = 0;

  var cleanSkusData = [];

  for (var sku of skus) {
    prevTax += sku.tax;
    prevFinalProfit += sku.finalProfit;
    prevInsuranceFee += sku.insuranceFee;
    prevAdditionalInsuranceFee += sku.additionalInsuranceFee;

    prevTax = truncateNum(prevTax);
    prevFinalProfit = truncateNum(prevFinalProfit);
    prevInsuranceFee = truncateNum(prevInsuranceFee);
    prevAdditionalInsuranceFee = truncateNum(prevAdditionalInsuranceFee);

    var { year, skuName } = sku;

    cleanSkusData.push({ year, skuName, data: cleanSku });
  }

  return {
    cleanSkusData,
    prevSkusData: {
      prevTax,
      prevFinalProfit,
      prevInsuranceFee,
      prevAdditionalInsuranceFee,
    },
  };
};

export default resetSkus;
