var columnsMap = {
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
  tax: "M",
  costPrice: "N",
  otherExpenses: "O",
  insuranceFee: "P",
  additionalInsuranceFee: "Q",
  finalProfit: "S",
};

var startRowNum = 2;
var valuesColumn = "C";
var skusSheetName = "Товары";

var profitMarginCol = "R";
var profitMarginRowNum = 19;

var rowsMap = {
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
  16: "tax",
  17: "insuranceFee",
  18: "additionalInsuranceFee",
  20: "finalProfit",
};

var setFormulasToTotalsSheet = (ws, skuQty) => {
  for (var rowNum in rowsMap) {
    var rowVal = rowsMap[rowNum];
    var startCellAddress = columnsMap[rowVal] + startRowNum;
    var endCellAddress = columnsMap[rowVal] + skuQty;

    var formula = `SUM(${skusSheetName}!${startCellAddress}:${endCellAddress})`;
    var formulaCellAddress = valuesColumn + rowNum;
    ws.getCell(formulaCellAddress).value = { formula };
  }
};

export default setFormulasToTotalsSheet;
