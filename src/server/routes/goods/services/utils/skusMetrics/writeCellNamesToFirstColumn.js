var firstColumnName = "A";

var writeCellNamesToFirstColumn = (ws, sku, indentToNextSku) => {
  var indentToRetailAmount = indentToNextSku + 1;
  var indentToTaxableAmount = indentToNextSku + 2;
  var indentToQty = indentToNextSku + 3;
  var indentToReturnAmount = indentToNextSku + 4;
  var indentToSellerPayoutAmount = indentToNextSku + 5;
  var indentToProductCosts = indentToNextSku + 6;
  var indentToOtherExpenses = indentToNextSku + 7;
  var indentToDeliveryCost = indentToNextSku + 8;
  var indentToAcceptance = indentToNextSku + 9;
  var indentToFines = indentToNextSku + 10;
  var indentToDeductionOrPayment = indentToNextSku + 11;
  var indentToStorageCost = indentToNextSku + 12;
  var indentToAdCosts = indentToNextSku + 13;
  var indentToTaxAmount = indentToNextSku + 14;
  var indentToInsuranceFee = indentToNextSku + 15;
  var indentToAdditionalInsuranceFee = indentToNextSku + 16;
  var indentToProfitMargin = indentToNextSku + 17;
  var indentToFinalProfit = indentToNextSku + 18;
  var indentToAvrgFinalProfit = indentToNextSku + 19;

  var skuNameCellAddress = firstColumnName + indentToNextSku;

  ws.getCell(skuNameCellAddress).value = sku.skuName.toUpperCase();
  ws.getCell(firstColumnName + indentToRetailAmount).value = "Сумма продаж";
  ws.getCell(firstColumnName + indentToTaxableAmount).value = "Налогооблагаемая база";
  ws.getCell(firstColumnName + indentToQty).value = "Количество";
  ws.getCell(firstColumnName + indentToReturnAmount).value = "Возвраты";
  ws.getCell(firstColumnName + indentToSellerPayoutAmount).value = "Выплаты продавцу";
  ws.getCell(firstColumnName + indentToProductCosts).value = "Затраты на товар";
  ws.getCell(firstColumnName + indentToOtherExpenses).value = "Прочие расходы";
  ws.getCell(firstColumnName + indentToDeliveryCost).value = "Доставка";
  ws.getCell(firstColumnName + indentToAcceptance).value = "Приёмка";
  ws.getCell(firstColumnName + indentToFines).value = "Штрафы";
  ws.getCell(firstColumnName + indentToDeductionOrPayment).value = "Удержания/Выплаты";
  ws.getCell(firstColumnName + indentToStorageCost).value = "Хранение";
  ws.getCell(firstColumnName + indentToAdCosts).value = "Реклама";
  ws.getCell(firstColumnName + indentToTaxAmount).value = "Налоги";
  ws.getCell(firstColumnName + indentToInsuranceFee).value = "Обязательные страховые взноcы";
  ws.getCell(firstColumnName + indentToAdditionalInsuranceFee).value = "Дополнительные страховые взноcы";
  ws.getCell(firstColumnName + indentToProfitMargin).value = "Маржинальность";
  ws.getCell(firstColumnName + indentToFinalProfit).value = "Чистая прибыль";
  ws.getCell(firstColumnName + indentToAvrgFinalProfit).value = "Среднеяя чистая прибыль";

  return ws;
};

export default writeCellNamesToFirstColumn;
