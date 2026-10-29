var defaultTaxRate = 6;
var taxRateCellAddress = "B1";

var taxRateTextCellAddress = "A1";
var taxRateText = "Процент налога (УСН Доходы)";

var alignmentStyles = {
  vertical: "middle",
  horizontal: "center",
  wrapText: true,
};

var fontStyles = { bold: true, font: 10 };

var setDefaultTaxRateToSkusWorkSheet = (workSheet) => {
  workSheet.getCell(taxRateCellAddress).value = defaultTaxRate;
  workSheet.getCell(taxRateTextCellAddress).value = taxRateText;

  //styles
  workSheet.getCell(taxRateCellAddress).font = fontStyles;
  workSheet.getCell(taxRateCellAddress).alignment = alignmentStyles;

  workSheet.getCell(taxRateTextCellAddress).font = fontStyles;
  workSheet.getCell(taxRateTextCellAddress).alignment = alignmentStyles;
};

export default setDefaultTaxRateToSkusWorkSheet;
