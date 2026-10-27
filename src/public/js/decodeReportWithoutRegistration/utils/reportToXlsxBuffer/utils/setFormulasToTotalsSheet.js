var columnsMapOfSkusSheet = {
  qty: "B",
  returnAmount: "C",
  retailAmount: "D",
  sellerPayoutAmount: "E",
  deliveryCost: "F",
  deductionOrPayment: "G",
  avrgAdvert: "H",
  storageCost: "I",
  acceptance: "J",
  fines: "K",
  profit: "L",
  costPrice: "M",
  otherExpenses: "N",
  finalProfit: "P",
};

var rowsMapOfTotalsSheet = {
  4: "retailAmount",
  5: "qty",
  6: "returnAmount",
  7: "sellerPayoutAmount",
  8: "costPrice",
  9: "otherExpenses",
  10: "deliveryCost",
  11: "acceptance",
  12: "fines",
  13: "deductionOrPayment",
  14: "storageCost",
  15: "avrgAdvert",
  17: "finalProfit",
};

var valuesColumn = "B";

var productCostsCellAddress = "B8";
var retailAmountCellAddress = "B4";
var finalProfitCellAddress = "B17";
var profitMarginCellAddress = "B16";
var profitMarginCalcFormula = `TRUNC(IF(OR(${finalProfitCellAddress} = 0, ${retailAmountCellAddress} = 0), 0, ${finalProfitCellAddress} * 100 / ${retailAmountCellAddress}), 2)`;

var getFormulaToProductCosts = (sheetName, skusQty) => {
  var startRowNum = 2;

  var startQtyCellAddress = columnsMapOfSkusSheet.qty + startRowNum;
  var endQtyCellAddress = columnsMapOfSkusSheet.qty + skusQty;

  var startCostPriceCellAddress = columnsMapOfSkusSheet.costPrice + startRowNum;
  var endCostPriceCellAddress = columnsMapOfSkusSheet.costPrice + skusQty;

  var productCostsFormula = `SUMPRODUCT('${sheetName}'!${startQtyCellAddress}:${endQtyCellAddress}, '${sheetName}'!${startCostPriceCellAddress}:${endCostPriceCellAddress})`;

  return { productCostsFormula };
};

var setFormulasToTotalsSheet = (workSheet, sheetName, skusQty) => {
  var startRowNum = 2;

  for (var rowNum in rowsMapOfTotalsSheet) {
    var rowVal = rowsMapOfTotalsSheet[rowNum];
    var startCellAddress = columnsMapOfSkusSheet[rowVal] + startRowNum;
    var endCellAddress = columnsMapOfSkusSheet[rowVal] + skusQty;

    var formula = `SUM('${sheetName}'!${startCellAddress}:${endCellAddress})`;

    var formulaCellAddress = valuesColumn + rowNum;
    workSheet.getCell(formulaCellAddress).value = { formula };
  }

  workSheet.getCell(profitMarginCellAddress).value = {
    formula: profitMarginCalcFormula,
  };

  var { productCostsFormula } = getFormulaToProductCosts(sheetName, skusQty);

  workSheet.getCell(productCostsCellAddress).value = {
    formula: productCostsFormula,
  };
};

var setFormulasToParentTotalsSheet = (workSheet, childTotalSheetsName) => {
  for (var rowNum in rowsMapOfTotalsSheet) {
    var targetCellAddress = valuesColumn + rowNum;

    var formulaPart = childTotalSheetsName
      .map((name) => `'${name}'!${targetCellAddress}`)
      .join(",");

    var formula = `SUM(${formulaPart})`;

    workSheet.getCell(targetCellAddress).value = { formula };
  }

  workSheet.getCell(profitMarginCellAddress).value = {
    formula: profitMarginCalcFormula,
  };
};

export { setFormulasToTotalsSheet, setFormulasToParentTotalsSheet };
