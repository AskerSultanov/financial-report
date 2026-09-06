import aggregateSkuData from "./aggregateSkuData.js";
import getSkuNamesAndIds from "./getSkuNamesAndIds.js";
import calculateTotalStorageCost from "./calculateTotalStorageCost.js";
import calculateAvrgStorageCostForEachReportItem from "./calculateAvrgStorageCostForEachReportItem.js";

var aggregateWeeklyFinancialReports = (weeklyFinancialReports, paidStorageReport) => {
  var weeklyFinancialReport = [];

  if (!weeklyFinancialReports || !weeklyFinancialReports.length) {
    return { weeklyFinancialReport, paidStorageReport };
  }

  for (var { dateFrom, dateTo, reportId, workSheet, workSheetData } of weeklyFinancialReports) {
    var { columnsNames, requiredColumnsName } = workSheetData;

    var { skuNamesAndIds } = getSkuNamesAndIds(workSheet, columnsNames);

    if (!paidStorageReport.length) {
      var { totalStorageCost } = calculateTotalStorageCost(workSheet, requiredColumnsName.storageCostColumn);
      var { avrgStorageCostForEachItem } = calculateAvrgStorageCostForEachReportItem(totalStorageCost, skuNamesAndIds);

      var { skus, avrgStorageDataForEachSku } = aggregateSkuData(
        workSheet,
        skuNamesAndIds,
        reportId,
        requiredColumnsName,
        dateFrom,
        dateTo,
        avrgStorageCostForEachItem,
      );

      paidStorageReport.push(...avrgStorageDataForEachSku);
      weeklyFinancialReport.push(...skus);
    } else {
      var { skus } = aggregateSkuData(workSheet, skuNamesAndIds, reportId, requiredColumnsName, dateFrom, dateTo);
      weeklyFinancialReport.push(...skus);
    }
  }

  return { weeklyFinancialReport, paidStorageReport };
};

export default aggregateWeeklyFinancialReports;
