var writeSkuDataToCells = (ws, sku, skuDataIndent, column) => {
  var indentToYear = skuDataIndent;
  var indentToRetailAmount = skuDataIndent + 1;
  var indentToTaxableAmount = skuDataIndent + 2;
  var indentToQty = skuDataIndent + 3;
  var indentToReturnAmount = skuDataIndent + 4;
  var indentToSellerPayoutAmount = skuDataIndent + 5;
  var indentToProductCosts = skuDataIndent + 6;
  var indentToOtherExpenses = skuDataIndent + 7;
  var indentToDeliveryCost = skuDataIndent + 8;
  var indentToAcceptance = skuDataIndent + 9;
  var indentToFines = skuDataIndent + 10;
  var indentToDeductionOrPayment = skuDataIndent + 11;
  var indentToStorageCost = skuDataIndent + 12;
  var indentToAdCosts = skuDataIndent + 13;
  var indentToTaxAmount = skuDataIndent + 14;
  var indentToInsuranceFee = skuDataIndent + 15;
  var indentToAdditionalInsuranceFee = skuDataIndent + 16;
  var indentToProfitMargin = skuDataIndent + 17;
  var indentToFinalProfit = skuDataIndent + 18;
  var indentToAvrgFinalProfit = skuDataIndent + 19;

  var avrgFinalProfit = +(sku.finalProfit / sku.qty).toFixed(2);

  if (isNaN(avrgFinalProfit)) {
    avrgFinalProfit = 0;
  }

  ws.getCell(column + indentToYear).value = sku.year;
  ws.getCell(column + indentToRetailAmount).value = sku.retailAmount;
  ws.getCell(column + indentToTaxableAmount).value = sku.taxableAmount;
  ws.getCell(column + indentToQty).value = sku.sold;
  ws.getCell(column + indentToReturnAmount).value = sku.returnAmount;
  ws.getCell(column + indentToSellerPayoutAmount).value = sku.sellerPayoutAmount;
  ws.getCell(column + indentToProductCosts).value = sku.productCosts;
  ws.getCell(column + indentToOtherExpenses).value = sku.otherExpenses;
  ws.getCell(column + indentToDeliveryCost).value = sku.deliveryCost;
  ws.getCell(column + indentToAcceptance).value = sku.paidAcceptance;
  ws.getCell(column + indentToFines).value = sku.fines;
  ws.getCell(column + indentToDeductionOrPayment).value = sku.deductionOrPayment;
  ws.getCell(column + indentToStorageCost).value = sku.storageCost;
  ws.getCell(column + indentToAdCosts).value = sku.advertisingCosts;
  ws.getCell(column + indentToTaxAmount).value = sku.taxAmount;
  ws.getCell(column + indentToInsuranceFee).value = sku.insuranceFee;
  ws.getCell(column + indentToAdditionalInsuranceFee).value = sku.additionalInsuranceFee;
  ws.getCell(column + indentToProfitMargin).value = sku.profitMargin;
  ws.getCell(column + indentToFinalProfit).value = sku.finalProfit;
  ws.getCell(column + indentToAvrgFinalProfit).value = avrgFinalProfit;
  // }

  return ws;
};

export default writeSkuDataToCells;
