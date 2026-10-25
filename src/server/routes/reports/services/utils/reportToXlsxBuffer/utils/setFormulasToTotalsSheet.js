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
  tax: "M",
  costPrice: "N",
  otherExpenses: "O",
  insuranceFee: "P",
  additionalInsuranceFee: "Q",
  finalProfit: "S",
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
  16: "tax",
  17: "insuranceFee",
  18: "additionalInsuranceFee",
  20: "finalProfit",
};

var startRowNum = 2;
var valuesColumn = "B";

var retailAmountCellAddress = "B4";
var finalProfitCellAddress = "B20";
var profitMarginCellAddress = "B19";
var profitMarginCalcFormula = `TRUNC(IF(OR(${finalProfitCellAddress} = 0, ${retailAmountCellAddress} = 0), 0, ${finalProfitCellAddress} * 100 / ${retailAmountCellAddress}), 2)`;

var setFormulasToTotalsSheet = (
  workSheet,
  isCrossYearPeriod,
  startYearSheetOpt,
  endYearSheetOpt,
) => {
  if (isCrossYearPeriod) {
    var startYearSheetName = startYearSheetOpt.sheetName;
    var endYearSheetName = endYearSheetOpt.sheetName;

    var startYearSkusQty = startYearSheetOpt.skusQty;
    var endYearSkusQty = endYearSheetOpt.skusQty;

    for (var rowNum in rowsMapOfTotalsSheet) {
      var rowVal = rowsMapOfTotalsSheet[rowNum];

      var startCellAddress = columnsMapOfSkusSheet[rowVal] + startRowNum;

      var lastCellAddressToStartYearSheet =
        columnsMapOfSkusSheet[rowVal] + startYearSkusQty;

      var lastCellAddressToEndYearSheer =
        columnsMapOfSkusSheet[rowVal] + endYearSkusQty;

      var startYearFormulaPart = `${startYearSheetName}!${startCellAddress}:${lastCellAddressToStartYearSheet}`;
      var endYearFormulaPart = `${endYearSheetName}!${startCellAddress}:${lastCellAddressToEndYearSheer}`;

      var formula = `SUM(${startYearFormulaPart}, ${endYearFormulaPart})`;

      var formulaCellAddress = valuesColumn + rowNum;

      workSheet.getCell(formulaCellAddress).value = { formula };
    }
  } else {
    var { sheetName, skusQty } = startYearSheetOpt;

    for (var rowNum in rowsMapOfTotalsSheet) {
      var rowVal = rowsMapOfTotalsSheet[rowNum];
      var startCellAddress = columnsMapOfSkusSheet[rowVal] + startRowNum;
      var endCellAddress = columnsMapOfSkusSheet[rowVal] + skusQty;

      var formula = `SUM(${sheetName}!${startCellAddress}:${endCellAddress})`;

      var formulaCellAddress = valuesColumn + rowNum;
      workSheet.getCell(formulaCellAddress).value = { formula };
    }
  }

  workSheet.getCell(profitMarginCellAddress).value = {
    formula: profitMarginCalcFormula,
  };
};

export default setFormulasToTotalsSheet;
