import setStylesToSummaryWorkSheet from "./setStylesToSummaryWorkSheet.js";
import writeTitlesToSummaryWorkSheet from "./writeTitlesToSummaryWorkSheet.js";
import writeReportPeriodToSummaryWorkSheet from "./writeReportPeriodToSummaryWorkSheet.js";

var createSummaryWorkSheet = (workSheet, dateFrom, dateTo) => {
  setStylesToSummaryWorkSheet(workSheet);

  writeTitlesToSummaryWorkSheet(workSheet);

  writeReportPeriodToSummaryWorkSheet(workSheet, dateFrom, dateTo);

  return workSheet;
};

export default createSummaryWorkSheet;
