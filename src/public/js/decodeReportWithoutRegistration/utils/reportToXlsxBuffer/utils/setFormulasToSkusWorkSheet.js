var qtyCol = "B";
var retailAmountCol = "D";
var taxableAmountCol = "E";
var sellerPayoutAmountCol = "F";
var deliveryCol = "G";
var deductionOrPaymentCol = "H";
var avrgAdvertCol = "I";
var storageCol = "J";
var acceptanceCol = "K";
var finesCol = "L";
var profitCol = "M";
var costPriceCol = "N";
var otherExpensesCol = "O";
var taxCol = "P";
var profitMarginCol = "Q";
var finalProfitCol = "R";

var taxRateCellAddress = "B1";

var getTaxCalcFormula = (rowNum) => {
  var taxableAmountCellAddress = taxableAmountCol + rowNum;

  var taxCalcFormula = `${taxableAmountCellAddress} * ${taxRateCellAddress}%`;

  return { taxCalcFormula: { formula: taxCalcFormula } };
};

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

  var taxCellAddress = taxCol + rowNum;
  var profitCellAddress = profitCol + rowNum;
  var otherExpensesCellAddress = otherExpensesCol + rowNum;

  var finalProfitCalcFormula = `${profitCellAddress} - 
                                ${taxCellAddress} -  
                                ${productCostsFormula} - 
                                ${otherExpensesCellAddress}`;

  return { finalProfitCalcFormula: { formula: finalProfitCalcFormula } };
};

var setFormulasToSkusWorkSheet = (workSheet, rowNum) => {
  var { taxCalcFormula } = getTaxCalcFormula(rowNum);
  var { profitCalcFormula } = getProfitCalcFormula(rowNum);
  var { finalProfitCalcFormula } = getFinalProfitCalcFormula(rowNum);
  var { profitMarginCalcFormula } = getProfitMarginCalcFormula(rowNum);

  var taxCellAddress = taxCol + rowNum;
  var profitCellAddress = profitCol + rowNum;
  var finalProfitCellAddress = finalProfitCol + rowNum;
  var profitMarginCellAddress = profitMarginCol + rowNum;

  workSheet.getCell(taxCellAddress).value = taxCalcFormula;
  workSheet.getCell(profitCellAddress).value = profitCalcFormula;
  workSheet.getCell(finalProfitCellAddress).value = finalProfitCalcFormula;
  workSheet.getCell(profitMarginCellAddress).value = profitMarginCalcFormula;
};

export default setFormulasToSkusWorkSheet;
