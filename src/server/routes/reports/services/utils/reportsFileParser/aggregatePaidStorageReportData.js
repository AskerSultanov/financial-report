import exceljs from "exceljs";

var aggregatePaidStorageReportData = (paidStorageReports) => {
  var paidStorageReport = [];

  if (!paidStorageReports) {
    return { paidStorageReport };
  }

  for (var { workSheet, workSheetData } of paidStorageReports) {
    var startRowNum = 3;

    var { requiredColumnsName } = workSheetData;

    while (startRowNum <= workSheet.actualRowCount) {
      var dateCellAddress = requiredColumnsName.dateColumn + startRowNum;
      var skuIdCellAddress = requiredColumnsName.skuIdColumn + startRowNum;
      var skuNameCellAddress = requiredColumnsName.skuNameColumn + startRowNum;
      var warehousePriceCellAddress = requiredColumnsName.warehousePriceColumn + startRowNum;

      var date = workSheet.getCell(dateCellAddress)?.value;
      var nmId = workSheet.getCell(skuIdCellAddress)?.value || 0;
      var vendorCode = workSheet.getCell(skuNameCellAddress)?.value || 0;
      var warehousePrice = workSheet.getCell(warehousePriceCellAddress)?.value || 0;

      paidStorageReport.push({ date, nmId, vendorCode, warehousePrice });

      startRowNum++;
    }
  }

  return { paidStorageReport };
};

export default aggregatePaidStorageReportData;
