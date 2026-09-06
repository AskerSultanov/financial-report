var calculateTotalStoragecost = (workSheet, storageCostColumnName) => {
  var firstRowNum = 2;
  var totalStorageCost = 0;

  while (firstRowNum <= workSheet.actualRowCount) {
    var storageDataCellAddress = storageCostColumnName + firstRowNum;
    totalStorageCost += workSheet.getCell(storageDataCellAddress)?.value || 0;

    firstRowNum++;
  }

  return { totalStorageCost };
};

export default calculateTotalStoragecost;
