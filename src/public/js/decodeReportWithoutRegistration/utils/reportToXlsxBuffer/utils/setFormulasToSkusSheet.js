var qtyCol = "B";
var retailAmountCol = "D";
var sellerPayoutAmountCol = "E";
var deliveryCol = "F";
var deductionOrPaymentCol = "G";
var avrgAdvertCol = "H";
var storageCol = "I";
var acceptanceCol = "J";
var finesCol = "K";
var profitCol = "L";
var costPriceCol = "M";
var otherExpensesCol = "N";
var profitMarginCol = "O";
var finalProfitCol = "P";

var getProfitMarginCalcFormula = (rowNum) => {
  var retailAmountCellAddress = retailAmountCol + rowNum;
  var finalProfitCellAddress = finalProfitCol + rowNum;

  var checkFinalProfitValPart = `${finalProfitCellAddress} = 0`;
  var checkRetailAmountValPart = `${retailAmountCellAddress} = 0`;
  var profitMarginCalcFormulaItself = `${finalProfitCellAddress} * 100 / ${retailAmountCellAddress}`;

  var profitMarginCalcFormula = `TRUNC(IF(OR(${checkFinalProfitValPart}, ${checkRetailAmountValPart}), 0, ${profitMarginCalcFormulaItself}), 2)`;
  return { profitMarginCalcFormula: { formula: profitMarginCalcFormula } };
};

var getProfitCalcFormula = (rowNum) => {
  var sellerPayoutAmountCellAdrress = sellerPayoutAmountCol + rowNum;
  var deliveryCellAddress = deliveryCol + rowNum;
  var deductionOrPaymentCellAddress = deductionOrPaymentCol + rowNum;
  var avrgAdvertCellAddress = avrgAdvertCol + rowNum;
  var storageCellAddress = storageCol + rowNum;
  var acceptanceCellAddress = acceptanceCol + rowNum;
  var finesCellAddress = finesCol + rowNum;

  var profitCalcFormula = `${sellerPayoutAmountCellAdrress} -
    ${deliveryCellAddress} -
    ${deductionOrPaymentCellAddress} -
    ${avrgAdvertCellAddress} -
    ${storageCellAddress} -
    ${acceptanceCellAddress} -
    ${finesCellAddress}`;

  return { profitCalcFormula: { formula: profitCalcFormula } };
};

var getFinalProfitCalcFormula = (rowNum) => {
  var qtyCellAddress = qtyCol + rowNum;
  var costPriceCellAddress = costPriceCol + rowNum;

  var productCostsFormula = `${qtyCellAddress} * ${costPriceCellAddress}`;

  var profitCellAddress = profitCol + rowNum;
  var otherExpensesCellAddress = otherExpensesCol + rowNum;

  var finalProfitCalcFormula = `${profitCellAddress} - ${otherExpensesCellAddress} - ${productCostsFormula}`;

  return { finalProfitCalcFormula: { formula: finalProfitCalcFormula } };
};

var setFormulasToSkusSheet = (ws, rowNum) => {
  var { profitCalcFormula } = getProfitCalcFormula(rowNum);
  var { finalProfitCalcFormula } = getFinalProfitCalcFormula(rowNum);
  var { profitMarginCalcFormula } = getProfitMarginCalcFormula(rowNum);

  var profitCellAddress = profitCol + rowNum;
  var finalProfitCellAddress = finalProfitCol + rowNum;
  var profitMarginCellAddress = profitMarginCol + rowNum;

  ws.getCell(profitCellAddress).value = profitCalcFormula;
  ws.getCell(finalProfitCellAddress).value = finalProfitCalcFormula;
  ws.getCell(profitMarginCellAddress).value = profitMarginCalcFormula;
};

export default setFormulasToSkusSheet;
