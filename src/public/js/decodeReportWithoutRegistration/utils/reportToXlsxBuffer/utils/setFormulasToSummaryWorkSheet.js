var columnsMapOfSkusSheet = {
  qty: "B",
  returnAmount: "C",
  retailAmount: "D",
  taxableAmount: "E",
  sellerPayoutAmount: "F",
  deliveryCost: "G",
  deductionOrPayment: "H",
  avrgAdvert: "I",
  storageCost: "J",
  acceptance: "K",
  fines: "L",
  profit: "M",
  costPrice: "N",
  otherExpenses: "O",
  tax: "P",
  finalProfit: "R",
};

var rowsMapOfTotalsSheet = {
  4: "retailAmount",
  5: "taxableAmount",
  6: "qty",
  7: "returnAmount",
  8: "sellerPayoutAmount",
  9: "costPrice",
  10: "otherExpenses",
  11: "deliveryCost",
  12: "acceptance",
  13: "fines",
  14: "deductionOrPayment",
  15: "storageCost",
  16: "avrgAdvert",
  17: "tax",
  19: "finalProfit",
};

var valuesColumn = "B";

var productCostsCellAddress = "B9";
var retailAmountCellAddress = "B4";
var finalProfitCellAddress = "B19";
var profitMarginCellAddress = "B18";
var profitMarginCalcFormula = `TRUNC(IF(OR(${finalProfitCellAddress} = 0, ${retailAmountCellAddress} = 0), 0, ${finalProfitCellAddress} * 100 / ${retailAmountCellAddress}), 2)`;

var getFormulaToProductCosts = (workSheetName, lastRowNum) => {
  var startRowNum = 6;

  var startQtyCellAddress = columnsMapOfSkusSheet.qty + startRowNum;
  var endQtyCellAddress = columnsMapOfSkusSheet.qty + lastRowNum;

  var startCostPriceCellAddress = columnsMapOfSkusSheet.costPrice + startRowNum;
  var endCostPriceCellAddress = columnsMapOfSkusSheet.costPrice + lastRowNum;

  var productCostsFormula = `SUMPRODUCT('${workSheetName}'!${startQtyCellAddress}:${endQtyCellAddress}, '${workSheetName}'!${startCostPriceCellAddress}:${endCostPriceCellAddress})`;

  return { productCostsFormula };
};

var setFormulasToSummaryWorkSheet = (workSheet, workSheetName, skusQty) => {
  var startRowNum = 6;
  var lastRowNum = startRowNum + skusQty - 1;

  for (var rowNum in rowsMapOfTotalsSheet) {
    var rowVal = rowsMapOfTotalsSheet[rowNum];
    var startCellAddress = columnsMapOfSkusSheet[rowVal] + startRowNum;
    var endCellAddress = columnsMapOfSkusSheet[rowVal] + lastRowNum;

    var formula = `SUM('${workSheetName}'!${startCellAddress}:${endCellAddress})`;

    var formulaCellAddress = valuesColumn + rowNum;
    workSheet.getCell(formulaCellAddress).value = { formula };
  }

  workSheet.getCell(profitMarginCellAddress).value = {
    formula: profitMarginCalcFormula,
  };

  var { productCostsFormula } = getFormulaToProductCosts(
    workSheetName,
    lastRowNum,
  );

  workSheet.getCell(productCostsCellAddress).value = {
    formula: productCostsFormula,
  };
};

var setFormulasToParentSummaryWorkSheet = (workSheet, childTotalSheetsName) => {
  for (var rowNum in rowsMapOfTotalsSheet) {
    var targetCellAddress = valuesColumn + rowNum;

    var formulaPart = childTotalSheetsName
      .map((workSheetName) => `'${workSheetName}'!${targetCellAddress}`)
      .join(",");

    var formula = `SUM(${formulaPart})`;

    workSheet.getCell(targetCellAddress).value = { formula };
  }

  workSheet.getCell(profitMarginCellAddress).value = {
    formula: profitMarginCalcFormula,
  };
};

export { setFormulasToSummaryWorkSheet, setFormulasToParentSummaryWorkSheet };
