var expectedDateColumnName = "A";
var expectedSkuIdColumnName = "Q";
var expectedSkuNameColumnName = "P";
var expectedWarehousePriceColumnName = "T";

var dateTitleText = "Дата";
var skuIdTitleText = "Артикул WB";
var skuNameTitleText = "Артикул продавца";
var warehousePriceTitleText = "Сумма хранения, руб";

var titlesRowNum = 2;

var getRequiredColumnsNameFromPaidStorageReportFile = (workSheet, columnsNames) => {
  var topCells = [];
  var requiredColumnsName = [];

  for (var colName of columnsNames) {
    var cellAddress = colName + titlesRowNum;
    var colTitle = workSheet.getCell(cellAddress).value;
    topCells.push({ colName, colTitle });
  }

  var dateColumn = workSheet.getCell(expectedDateColumnName + titlesRowNum).value === dateTitleText;
  if (!dateColumn) {
    requiredColumnsName.dateColumn = topCells.find((topCell) => topCell.colTitle === dateTitleText).colName;
  } else {
    requiredColumnsName.dateColumn = expectedDateColumnName;
  }

  var skuIdColumn = workSheet.getCell(expectedSkuIdColumnName + titlesRowNum).value === skuIdTitleText;
  if (!skuIdColumn) {
    requiredColumnsName.skuIdColumn = topCells.find((topCell) => topCell.colTitle === skuIdTitleText).colName;
  } else {
    requiredColumnsName.skuIdColumn = expectedSkuIdColumnName;
  }

  var skuNameColumn = workSheet.getCell(expectedSkuNameColumnName + titlesRowNum).value === skuNameTitleText;
  if (skuNameColumn) {
    requiredColumnsName.skuNameColumn = topCells.find((topCell) => topCell.colTitle === skuNameTitleText).colName;
  } else {
    requiredColumnsName.skuNameColumn = expectedSkuNameColumnName;
  }

  var warehousePriceColumn = workSheet.getCell(expectedWarehousePriceColumnName + titlesRowNum).value === warehousePriceTitleText;
  if (warehousePriceColumn) {
    requiredColumnsName.warehousePriceColumn = topCells.find((topCell) => topCell.colTitle === warehousePriceTitleText).colName;
  } else {
    requiredColumnsName.warehousePriceColumn = expectedWarehousePriceColumnName;
  }

  return { requiredColumnsName };
};

export default getRequiredColumnsNameFromPaidStorageReportFile;
