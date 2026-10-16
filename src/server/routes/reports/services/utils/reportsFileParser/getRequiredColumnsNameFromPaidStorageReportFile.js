var expectedDateColName = "A";
var expectedSkuIdColName = "Q";
var expectedSkuNameColName = "P";
var expectedWarehousePriceColName = "T";

var dateTitleText = "Дата";
var skuIdTitleText = "Артикул WB";
var skuNameTitleText = "Артикул продавца";
var warehousePriceTitleText = "Сумма хранения, руб";

var titlesRowNum = 2;

var getRequiredColumnsNameFromPaidStorageReportFile = (
  workSheet,
  columnsNames,
) => {
  var topCells = [];
  var requiredColumnsName = [];

  for (var colName of columnsNames) {
    var cellAddress = colName + titlesRowNum;
    var colTitle = workSheet.getCell(cellAddress).value;
    topCells.push({ colName, colTitle });
  }

  var dateCellAddress = expectedDateColName + titlesRowNum;
  var dateColumn = workSheet.getCell(dateCellAddress).value === dateTitleText;

  if (!dateColumn) {
    requiredColumnsName.dateColumn = topCells.find(
      (topCell) => topCell.colTitle === dateTitleText,
    ).colName;
  } else {
    requiredColumnsName.dateColumn = expectedDateColName;
  }

  var skuIdCellAddress = expectedSkuIdColName + titlesRowNum;

  var skuIdColumn =
    workSheet.getCell(skuIdCellAddress).value === skuIdTitleText;

  if (!skuIdColumn) {
    requiredColumnsName.skuIdColumn = topCells.find(
      (topCell) => topCell.colTitle === skuIdTitleText,
    ).colName;
  } else {
    requiredColumnsName.skuIdColumn = expectedSkuIdColName;
  }

  var skuNameCellAddress = expectedSkuNameColName + titlesRowNum;

  var skuNameColumn =
    workSheet.getCell(skuNameCellAddress).value === skuNameTitleText;

  if (skuNameColumn) {
    requiredColumnsName.skuNameColumn = topCells.find(
      (topCell) => topCell.colTitle === skuNameTitleText,
    ).colName;
  } else {
    requiredColumnsName.skuNameColumn = expectedSkuNameColName;
  }

  var warehousePriceCellAddress = expectedWarehousePriceColName + titlesRowNum;

  var warehousePriceColumn =
    workSheet.getCell(warehousePriceCellAddress).value ===
    warehousePriceTitleText;

  if (warehousePriceColumn) {
    requiredColumnsName.warehousePriceColumn = topCells.find(
      (topCell) => topCell.colTitle === warehousePriceTitleText,
    ).colName;
  } else {
    requiredColumnsName.warehousePriceColumn = expectedWarehousePriceColName;
  }

  return { requiredColumnsName };
};

export default getRequiredColumnsNameFromPaidStorageReportFile;
