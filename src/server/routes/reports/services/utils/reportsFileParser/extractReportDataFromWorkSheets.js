import aggregatePaidStorageReportData from "./aggregatePaidStorageReportData.js";
import aggregateWeeklyFinancialReports from "./aggregateWeeklyFinancialReports.js";

var extractReportDataFromWorkSheets = async (onePeriodReports) => {
  var { paidStorageReport } = aggregatePaidStorageReportData(onePeriodReports?.paidStorageReports);

  var { weeklyFinancialReport, paidStorageReport } = aggregateWeeklyFinancialReports(onePeriodReports.weeklyFinancialReports, paidStorageReport);

  return {
    reportPeriodIsEmpty: !weeklyFinancialReport.length,
    reports: { weeklyFinancialReport, paidStorageReport, advertisingReport: [] },
  };
};

export default extractReportDataFromWorkSheets;
