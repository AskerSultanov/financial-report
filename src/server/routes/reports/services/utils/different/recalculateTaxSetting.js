import truncateNum from "../reportParsing/truncateNum.js";

var recalculateTaxSetting = (
  updatedTaxSettingFieldsBySku,
  prevSkuData,
  newSkuData,
) => {
  var updatedTaxSettingField = { ...updatedTaxSettingFieldsBySku };

  var recalculatedFinalProfit =
    updatedTaxSettingField.finalProfit -
    prevSkuData.finalProfit +
    newSkuData.finalProfit;
  var recalculatedOtherExpenses =
    updatedTaxSettingField.otherExpenses -
    prevSkuData.otherExpenses +
    newSkuData.otherExpenses;

  updatedTaxSettingField.finalProfit = truncateNum(recalculatedFinalProfit);
  updatedTaxSettingField.otherExpenses = truncateNum(recalculatedOtherExpenses);

  return { updatedTaxSettingField };
};

export default recalculateTaxSetting;
