var topCellNum = 1;
var skuNameTitleAlias = "Артикул поставщика";
var skuIdTitleAlias = "Код номенклатуры";

var getSkuNamesAndIds = (workSheet, columnsNames) => {
  var skuNamesAndIds = [];

  for (var colName of columnsNames) {
    var skuIdColumnName;
    var skuNameColumnName;

    var cellAddress = colName + topCellNum;
    var columnTItle = workSheet.getCell(cellAddress)?.value;

    if (columnTItle === skuNameTitleAlias) {
      skuNameColumnName = colName;
    }

    if (columnTItle === skuIdTitleAlias) {
      skuIdColumnName = colName;
    }

    if (skuNameColumnName && skuIdColumnName) {
      break;
    }
  }

  var startRowNum = 2;

  while (startRowNum <= workSheet.actualRowCount) {
    var skuNameCellAddresss = skuNameColumnName + startRowNum;

    var skuName = workSheet.getCell(skuNameCellAddresss)?.value;

    if (skuName) {
      var existSku = skuNamesAndIds.find((sku) => sku?.skuName === skuName);

      if (!existSku) {
        var skuIdCellAddress = skuIdColumnName + startRowNum;
        var skuId = workSheet.getCell(skuIdCellAddress)?.value;

        skuNamesAndIds.push({ skuName, skuId: +skuId, rowNums: [startRowNum] });
      } else {
        existSku.rowNums.push(startRowNum);
      }
    }

    startRowNum++;
  }

  return { skuNamesAndIds };
};

export default getSkuNamesAndIds;
